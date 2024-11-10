import { useState, useEffect } from "react";
import {
    Layout,
    Row,
    Col,
    Button,
    Spin,
    Input,
    Card,
    notification,
} from "antd";
import {
    useWallet,
    InputTransactionData,
} from "@aptos-labs/wallet-adapter-react";
import {
    Aptos,
    AptosConfig,
    Network,
    // WaitForTransactionOptions,
} from "@aptos-labs/ts-sdk";

const ONE_APT = 100000000;
// Initialize Aptos client
const aptosConfig = new AptosConfig({ network: Network.TESTNET });

const aptos = new Aptos(aptosConfig);
const moduleAddress =
    "0x791bb225d446fad68fb3aab4da12f8d58561f8291765c13b139e5921a68680e7";

// Define the interface for lottery information
interface LotteryInfo {
    lottery_id: string;
    admin: string;
    ticket_price: string;
    win_amount: string;
    participants: string[];
    is_active: boolean;
    winner: string | null;
    start_time: string;
    end_time: string | null;
}

// Define interface for lottery store
interface LotteryStore {
    current_lottery: LotteryInfo | null;
    past_lotteries: LotteryInfo[];
    total_lotteries: number;
}

export default function LotteryComponent() {
    const { account, signAndSubmitTransaction } = useWallet();
    const [allLotteryStore, setAllLotteryStore] = useState<any | null>(null);
    const [activeLottery, setActiveLottery] = useState<LotteryInfo | null>(
        null
    );
    const [transactionInProgress, setTransactionInProgress] =
        useState<boolean>(false);
    const [ticketPrice, setTicketPrice] = useState<string>("0");
    const [winAmount, setWinAmount] = useState<string>("0");

    // Fetch current lottery info
    const fetchLotteryInfo = async () => {
        if (!account) return;
        try {
            const lotteryStore = await aptos.getAccountResource({
                accountAddress: moduleAddress,
                resourceType: `${moduleAddress}::DRaffle::LotteryStore`,
            });
            console.log("lotteryStore: ", lotteryStore);
            setAllLotteryStore(lotteryStore);
            console.log(
                "active lottery: ",
                lotteryStore.current_lottery["vec"][0]
            );

            setActiveLottery(lotteryStore?.current_lottery?.["vec"]?.[0]);
        } catch (error) {
            console.error("Error fetching lottery:", error);
            setActiveLottery(null);
        }
    };

    useEffect(() => {
        fetchLotteryInfo();
        // Set up polling to refresh data
        const interval = setInterval(fetchLotteryInfo, 60000);
        return () => clearInterval(interval);
    }, [account?.address]);

    // Initialize new lottery with proper error handling
    const initializeLottery = async () => {
        if (!account) {
            notification.error({
                message: "Wallet not connected",
                description: "Please connect your wallet first",
            });
            return;
        }

        try {
            setTransactionInProgress(true);

            // Convert input values to BigInt strings (octas)
            const ticketPriceOctas = BigInt(
                parseFloat(ticketPrice) * 100000000
            ).toString();
            const winAmountOctas = BigInt(
                parseFloat(winAmount) * 100000000
            ).toString();

            const transaction: InputTransactionData = {
                data: {
                    function: `${moduleAddress}::DRaffle::initialize_lottery`,
                    functionArguments: [ticketPriceOctas, winAmountOctas],
                },
            };

            const response = await signAndSubmitTransaction(transaction);

            // Add a delay before checking transaction status
            await new Promise((resolve) => setTimeout(resolve, 2000));

            try {
                await aptos.waitForTransaction({
                    transactionHash: response.hash,
                    options: {
                        timeoutSecs: 30, // Increase timeout
                        checkSuccess: true, // Verify transaction success
                    },
                });

                notification.success({
                    message: "Success",
                    description: "New lottery initialized successfully!",
                });

                await fetchLotteryInfo();
            } catch (waitError: any) {
                throw new Error(
                    `Transaction failed or timed out: ${waitError.message}`
                );
            }
        } catch (error: any) {
            console.error("Lottery initialization error:", error);
            notification.error({
                message: "Error",
                description: `Failed to initialize lottery: ${error.message}`,
            });
        } finally {
            setTransactionInProgress(false);
        }
    };

    // Buy lottery ticket
    const buyTicket = async () => {
        if (!account) return;
        setTransactionInProgress(true);

        const transaction: InputTransactionData = {
            data: {
                function: `${moduleAddress}::DRaffle::buy_ticket`,
                functionArguments: [],
            },
        };

        try {
            const response = await signAndSubmitTransaction(transaction);
            await aptos.waitForTransaction({
                transactionHash: response.hash,
                options: {
                    checkSuccess: true,
                },
            });
            notification.success({
                message: "Success",
                description: "Ticket purchased successfully!",
            });
            fetchLotteryInfo();
        } catch (error: any) {
            notification.error({
                message: "Error",
                description: "Failed to buy ticket: " + error.message,
            });
        } finally {
            setTransactionInProgress(false);
        }
    };

    // Draw winner (admin only)
    const drawWinner = async () => {
        if (!account) return;
        setTransactionInProgress(true);

        const transaction: InputTransactionData = {
            data: {
                function: `${moduleAddress}::DRaffle::draw_winner`,
                functionArguments: [],
            },
        };

        try {
            const response = await signAndSubmitTransaction(transaction);
            await aptos.waitForTransaction({
                transactionHash: response.hash,
                options: {
                    checkSuccess: true,
                },
            });
            notification.success({
                message: "Success",
                description: "Winner drawn successfully!",
            });
            fetchLotteryInfo();
        } catch (error: any) {
            notification.error({
                message: "Error",
                description: "Failed to draw winner: " + error.message,
            });
        } finally {
            setTransactionInProgress(false);
        }
    };

    return (
        <Spin spinning={transactionInProgress}>
            <Layout>
                <Row align="middle">
                    <Col span={20} offset={2}>
                        <h1>Decentralized Lottery</h1>
                    </Col>
                </Row>

                {!activeLottery ? (
                    <Row gutter={[0, 32]} style={{ marginTop: "2rem" }}>
                        <Col span={8} offset={8}>
                            <Card title="Create New Lottery">
                                <Input
                                    placeholder="Ticket Price (in APT)"
                                    value={ticketPrice}
                                    onChange={(e) =>
                                        setTicketPrice(e.target.value)
                                    }
                                    style={{ marginBottom: "1rem" }}
                                />
                                <Input
                                    placeholder="Win Amount (in APT)"
                                    value={winAmount}
                                    onChange={(e) =>
                                        setWinAmount(e.target.value)
                                    }
                                    style={{ marginBottom: "1rem" }}
                                />
                                <Button
                                    block
                                    type="primary"
                                    onClick={initializeLottery}
                                    disabled={!account}
                                    style={{
                                        height: "40px",
                                        backgroundColor: "#3f67ff",
                                    }}
                                >
                                    Initialize Lottery
                                </Button>
                            </Card>
                        </Col>
                    </Row>
                ) : (
                    <Row gutter={[16, 16]} style={{ marginTop: "2rem" }}>
                        <Col span={12} offset={6}>
                            <Card title="Active Lottery" bordered={true}>
                                <p>Lottery ID: {activeLottery.lottery_id}</p>
                                <p>
                                    Ticket Price: {activeLottery.ticket_price}{" "}
                                    APT
                                </p>
                                <p>
                                    Win Amount: {activeLottery.win_amount} APT
                                </p>
                                <p>
                                    Participants:{" "}
                                    {activeLottery.participants.length}
                                </p>
                                <p>
                                    Status:{" "}
                                    {activeLottery.is_active
                                        ? "Active"
                                        : "Ended"}
                                </p>
                                {activeLottery.winner && (
                                    <p>Winner: To Be Declared</p>
                                )}

                                {activeLottery.is_active && (
                                    <div style={{ marginTop: "1rem" }}>
                                        <Button
                                            type="primary"
                                            onClick={buyTicket}
                                            disabled={!account}
                                            style={{ marginRight: "1rem" }}
                                        >
                                            Buy Ticket
                                        </Button>

                                        {account?.address === moduleAddress && (
                                            <Button
                                                type="primary"
                                                onClick={drawWinner}
                                                danger
                                            >
                                                Draw Winner
                                            </Button>
                                        )}
                                    </div>
                                )}
                            </Card>
                        </Col>
                    </Row>
                )}
            </Layout>
        </Spin>
    );
}
