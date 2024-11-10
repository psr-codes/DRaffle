import { useState, useEffect } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import {
    Aptos,
    AptosConfig,
    Network,
    InputTransactionData,
} from "@aptos-labs/ts-sdk";
import {
    Layout,
    Card,
    Input,
    Button,
    Form,
    InputNumber,
    Row,
    Col,
    Spin,
    Alert,
    Typography,
    notification,
    Badge,
} from "antd";

import Navbar from "./components/Navbar";
import { LoadingOutlined } from "@ant-design/icons";
import { Wallet } from "lucide-react";

interface CreateLotteryForm {
    lottery_name: string;
    ticket_price: number;
    win_amount: number;
    duration_days: number;
    description: string;
}

const { Title, Text } = Typography;

const ONE_APT = 100000000;
const MODULE_ADDRESS =
    "0x791bb225d446fad68fb3aab4da12f8d58561f8291765c13b139e5921a68680e7";
const aptosConfig = new AptosConfig({ network: Network.TESTNET });
const aptos = new Aptos(aptosConfig);

interface LotteryInfo {
    lottery_id: string;
    lottery_name: string;
    admin: string;
    ticket_price: string;
    win_amount: string;
    participants: string[];
    is_active: boolean;
    winner: string | null;
    start_time: string;
    end_time: string | null;
    duration_days: string;
    description: string;
}

export default function LotteryDashboard() {
    const {
        account,
        signAndSubmitTransaction,
        connect,
        disconnect,
        connected,
        wallet,
    } = useWallet();
    const [form] = Form.useForm();
    const [activeLotteries, setActiveLotteries] = useState<LotteryInfo[]>([]);
    const [pastLotteries, setPastLotteries] = useState<LotteryInfo[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const connectWallet = async () => {
        try {
            await connect("Petra");
        } catch (error) {
            setError("Failed to connect wallet");
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setError(null);
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    const fetchActiveLotteries = async () => {
        try {
            const lotteryStore = await aptos.getAccountResource({
                accountAddress: MODULE_ADDRESS,
                resourceType: `${MODULE_ADDRESS}::DRaffle2::LotteryStore`,
            });
            console.log("lotteryStore", lotteryStore);
            setActiveLotteries(lotteryStore.active_lotteries);
        } catch (err) {
            console.error("Error fetching lotteries:", err);
            setError("Failed to fetch active lotteries");
        }
    };

    const fetchPastLotteries = async () => {
        try {
            const lotteryStore = await aptos.getAccountResource({
                accountAddress: MODULE_ADDRESS,
                resourceType: `${MODULE_ADDRESS}::DRaffle2::LotteryStore`,
            });
            console.log("lotteryStore", lotteryStore);
            setPastLotteries(lotteryStore.past_lotteries);
        } catch (err) {
            console.error("Error fetching lotteries:", err);
            setError("Failed to fetch active lotteries");
        }
    };

    useEffect(() => {
        fetchActiveLotteries();
        const interval = setInterval(fetchActiveLotteries, 60000);
        return () => clearInterval(interval);
    }, [account?.address]);
    useEffect(() => {
        fetchPastLotteries();
        const interval = setInterval(fetchActiveLotteries, 60000);
        return () => clearInterval(interval);
    }, [account?.address]);

    const createLottery = async (values: CreateLotteryForm) => {
        if (!account) {
            notification.error({
                message: "Error",
                description: "Please connect your wallet first",
            });
            return;
        }

        console.log("Form values:", values);
        setLoading(true);
        setError(null);

        try {
            const payload = {
                data: {
                    function: `${MODULE_ADDRESS}::DRaffle2::initialize_lottery`,
                    typeArguments: [], // Note: changed from type_arguments to typeArguments
                    functionArguments: [
                        // Note: changed from arguments to functionArguments
                        values.lottery_name,
                        Math.floor(values.ticket_price * ONE_APT).toString(),
                        Math.floor(values.win_amount * ONE_APT).toString(),
                        Math.floor(values.duration_days),
                        values.description,
                    ],
                },
                sender: account.address,
            };

            console.log("Transaction payload:", payload);

            const response = await signAndSubmitTransaction(payload);
            console.log("Transaction response:", response);

            await aptos.waitForTransaction({ transactionHash: response.hash });

            notification.success({
                message: "Success",
                description: "Lottery created successfully!",
            });

            form.resetFields();
            await fetchActiveLotteries();
        } catch (err: any) {
            console.error("Failed to create lottery:", err);
            setError(err.message || "Failed to create lottery");
            notification.error({
                message: "Error",
                description: `Failed to create lottery: ${err.message}`,
            });
        } finally {
            setLoading(false);
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
        notification.error({
            message: "Form Validation Error",
            description: "Please check all required fields",
        });
    };

    const buyTicket = async (lotteryId: string) => {
        if (!account) {
            notification.error({
                message: "Error",
                description: "Please connect your wallet first",
            });
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const payload = {
                data: {
                    function: `${MODULE_ADDRESS}::DRaffle2::buy_ticket`,
                    typeArguments: [], // Changed from type_arguments
                    functionArguments: [lotteryId], // Changed from arguments
                },
                sender: account.address,
            };

            const response = await signAndSubmitTransaction(payload);
            await aptos.waitForTransaction({ transactionHash: response.hash });

            notification.success({
                message: "Success",
                description: "Ticket purchased successfully!",
            });

            await fetchActiveLotteries();
        } catch (err: any) {
            console.error("Failed to buy ticket:", err);
            setError(err.message || "Failed to buy ticket");
            notification.error({
                message: "Error",
                description: `Failed to buy ticket: ${err.message}`,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Spin
            spinning={loading}
            indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
        >
            <Layout.Content
                style={{ padding: "24px", maxWidth: 1200, margin: "0 auto" }}
            >
                {/* Wallet Connection Section */}

                <Navbar
                    connected={connected}
                    account={account}
                    connectWallet={connectWallet}
                    disconnect={disconnect}
                />
                {/* <Col>DRaffle</Col>
                    <Col>
                        {!connected ? (
                            <Button
                                type="primary"
                                onClick={connectWallet}
                                icon={<Wallet className="mr-2" size={16} />}
                            >
                                Connect Petra Wallet
                            </Button>
                        ) : (
                            <Button
                                onClick={() => disconnect()}
                                icon={<Wallet className="mr-2" size={16} />}
                            >
                                Disconnect {account?.address?.slice(0, 6)}...
                                {account?.address?.slice(-4)}
                            </Button>
                        )}
                    </Col> */}

                {/* Admin Section */}
                {account?.address === MODULE_ADDRESS && (
                    <Card
                        title={<Title level={3}>Create New Lottery</Title>}
                        style={{
                            marginBottom: 24,
                            background: "#e2e8f0",
                            border: "1px",
                            margin: "5px",
                        }}
                    >
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={createLottery}
                            onFinishFailed={onFinishFailed}
                            initialValues={{
                                ticket_price: 0,
                                win_amount: 0,
                                duration_days: 1,
                            }}
                        >
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item
                                        name="lottery_name"
                                        label="Lottery Name"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Please input lottery name!",
                                            },
                                            {
                                                min: 3,
                                                message:
                                                    "Name must be at least 3 characters",
                                            },
                                        ]}
                                    >
                                        <Input placeholder="Enter lottery name" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="ticket_price"
                                        label="Ticket Price (APT)"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Please input ticket price!",
                                            },
                                            {
                                                type: "number",
                                                min: 0.1,
                                                message:
                                                    "Price must be greater than 0.1 APT",
                                            },
                                        ]}
                                    >
                                        <InputNumber
                                            min={0.1}
                                            step={0.1}
                                            style={{ width: "100%" }}
                                            placeholder="Enter ticket price"
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item
                                        name="win_amount"
                                        label="Win Amount (APT)"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Please input win amount!",
                                            },
                                            {
                                                type: "number",
                                                min: 0.1,
                                                message:
                                                    "Win amount must be greater than 0.1 APT",
                                            },
                                        ]}
                                    >
                                        <InputNumber
                                            min={0.1}
                                            step={0.1}
                                            style={{ width: "100%" }}
                                            placeholder="Enter win amount"
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="duration_days"
                                        label="Duration (days)"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Please input duration!",
                                            },
                                            {
                                                type: "number",
                                                min: 1,
                                                message:
                                                    "Duration must be at least 1 day",
                                            },
                                        ]}
                                    >
                                        <InputNumber
                                            min={1}
                                            style={{ width: "100%" }}
                                            placeholder="Enter duration in days"
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Form.Item
                                name="description"
                                label="Description"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input description!",
                                    },
                                    {
                                        min: 10,
                                        message:
                                            "Description must be at least 10 characters",
                                    },
                                ]}
                            >
                                <Input.TextArea
                                    rows={4}
                                    placeholder="Enter lottery description"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    disabled={!account}
                                    block
                                >
                                    Create Lottery
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                )}

                {/* Error Alert */}
                {error && (
                    <Alert
                        message="Error"
                        description={error}
                        type="error"
                        showIcon
                        style={{ marginBottom: 24 }}
                    />
                )}

                {/* Active Lotteries Section */}
                <div style={{ margin: "10px" }}>
                    <Title level={3} style={{ marginBottom: 24 }}>
                        Active Lotteries
                    </Title>
                    <hr></hr>
                    <Row gutter={[16, 16]}>
                        {activeLotteries.map((lottery) => (
                            <Col
                                xs={24}
                                sm={12}
                                lg={8}
                                key={lottery.lottery_id}
                            >
                                <Card
                                    title={
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                boxShadow:
                                                    "0px 4px 6px rgba(0, 0, 0, 0.1)", // Adjust shadow color and size
                                            }}
                                        >
                                            <span>{lottery.lottery_name}</span>
                                            {account &&
                                                lottery?.participants?.includes(
                                                    account.address
                                                ) && (
                                                    <Badge
                                                        count={
                                                            <span
                                                                style={{
                                                                    color: "black",
                                                                    padding:
                                                                        "8px",
                                                                    backgroundColor:
                                                                        "yellow",
                                                                    borderRadius:
                                                                        "12px", // Rounded corners
                                                                    display:
                                                                        "inline-block", // Ensures the border-radius applies properly
                                                                }}
                                                            >
                                                                <b>
                                                                    {" "}
                                                                    {
                                                                        lottery?.participants?.filter(
                                                                            (
                                                                                participant
                                                                            ) =>
                                                                                participant ===
                                                                                account.address
                                                                        ).length
                                                                    }{" "}
                                                                </b>
                                                                Ticket(s) Bought
                                                            </span>
                                                        }
                                                        style={{
                                                            backgroundColor:
                                                                "#52c41a",
                                                        }}
                                                    />
                                                )}
                                        </div>
                                    }
                                    bordered
                                    hoverable
                                    style={{
                                        boxShadow:
                                            "0px 4px 6px rgba(0, 0, 0, 0.1)", // You can apply shadow to the Card as well
                                    }}
                                >
                                    <div style={{ marginBottom: 16 }}>
                                        <p>
                                            <Text type="secondary">
                                                {lottery.description}
                                            </Text>
                                        </p>
                                        <p>
                                            <Text strong>Ticket Price: </Text>
                                            {Number(lottery.ticket_price) /
                                                ONE_APT}{" "}
                                            APT
                                        </p>
                                        <p>
                                            <Text strong>Lottery Prize: </Text>
                                            {Number(lottery.win_amount) /
                                                ONE_APT}{" "}
                                            APT
                                        </p>
                                        <p>
                                            <Text strong>Duration: </Text>
                                            {lottery.duration_days} day(s)
                                        </p>
                                        <p>
                                            <Text strong>Participants: </Text>
                                            {lottery.participants.length}
                                        </p>
                                    </div>
                                    <Button
                                        type="primary"
                                        block
                                        onClick={() =>
                                            buyTicket(lottery.lottery_id)
                                        }
                                        disabled={!account}
                                    >
                                        Buy Ticket
                                    </Button>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
                {/* Expired Lotteries Section */}
                <div style={{ margin: "10px" }}>
                    <Title level={3} style={{ marginBottom: 24 }}>
                        Past Lotteries
                    </Title>
                    <hr></hr>

                    <Row gutter={[16, 16]}>
                        {pastLotteries.map((lottery) => (
                            <Col
                                xs={24}
                                sm={12}
                                lg={8}
                                key={lottery.lottery_id}
                            >
                                <Card
                                    title={
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                            }}
                                        >
                                            <span>{lottery.lottery_name}</span>
                                            {account && (
                                                <Badge
                                                    count={
                                                        <span
                                                            style={{
                                                                color: "#fff",
                                                                padding: "5px",
                                                                backgroundColor:
                                                                    "#52c41a",
                                                                borderRadius:
                                                                    "12px", // Rounded corners
                                                                display:
                                                                    "inline-block", // Ensures the border-radius applies properly
                                                            }}
                                                        >
                                                            {lottery?.winner[
                                                                "vec"
                                                            ]?.includes(
                                                                account.address
                                                            )
                                                                ? "Congratulations You Won"
                                                                : "Better Luck Next Time"}
                                                        </span>
                                                    }
                                                    style={{
                                                        backgroundColor:
                                                            "#52c41a",
                                                    }}
                                                />
                                            )}
                                        </div>
                                    }
                                    bordered
                                    hoverable
                                    style={{
                                        boxShadow:
                                            "0px 4px 6px rgba(0, 0, 0, 0.1)", // Apply shadow to the whole Card
                                    }}
                                >
                                    <div style={{ marginBottom: 16 }}>
                                        <p>
                                            <Text type="secondary">
                                                {lottery.description}
                                            </Text>
                                        </p>
                                        <p>
                                            <Text strong>Price: </Text>
                                            {Number(lottery.ticket_price) /
                                                ONE_APT}{" "}
                                            APT
                                        </p>
                                        <p>
                                            <Text strong>Win Amount: </Text>
                                            {Number(lottery.win_amount) /
                                                ONE_APT}{" "}
                                            APT
                                        </p>
                                        <p>
                                            <Text strong>Winner: </Text>
                                            {lottery?.winner["vec"][0]
                                                ? `${lottery?.winner[
                                                      "vec"
                                                  ][0].slice(
                                                      0,
                                                      6
                                                  )}...${lottery?.winner[
                                                      "vec"
                                                  ][0].slice(-4)}`
                                                : "N/A"}
                                        </p>
                                        <p>
                                            <Text strong>Duration: </Text>
                                            {lottery.duration_days} day(s)
                                        </p>
                                        <p>
                                            <Text strong>Participants: </Text>
                                            {lottery.participants.length}
                                        </p>
                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </Layout.Content>
        </Spin>
    );
}

// import { useState, useEffect } from "react";
// import {
//     Layout,
//     Row,
//     Col,
//     Button,
//     Spin,
//     Input,
//     Card,
//     notification,
// } from "antd";
// import {
//     useWallet,
//     InputTransactionData,
// } from "@aptos-labs/wallet-adapter-react";
// import {
//     Aptos,
//     AptosConfig,
//     Network,
//     // WaitForTransactionOptions,
// } from "@aptos-labs/ts-sdk";

// const ONE_APT = 100000000;
// // Initialize Aptos client
// const aptosConfig = new AptosConfig({ network: Network.TESTNET });

// const aptos = new Aptos(aptosConfig);
// const moduleAddress =
//     "0x791bb225d446fad68fb3aab4da12f8d58561f8291765c13b139e5921a68680e7";

// // Define the interface for lottery information
// interface LotteryInfo {
//     lottery_id: string;
//     admin: string;
//     ticket_price: string;
//     win_amount: string;
//     participants: string[];
//     is_active: boolean;
//     winner: string | null;
//     start_time: string;
//     end_time: string | null;
// }

// // Define interface for lottery store
// interface LotteryStore {
//     current_lottery: LotteryInfo | null;
//     past_lotteries: LotteryInfo[];
//     total_lotteries: number;
// }

// export default function LotteryComponent() {
//     const { account, signAndSubmitTransaction } = useWallet();
//     const [allLotteryStore, setAllLotteryStore] = useState<any | null>(null);
//     const [activeLottery, setActiveLottery] = useState<LotteryInfo | null>(
//         null
//     );
//     const [transactionInProgress, setTransactionInProgress] =
//         useState<boolean>(false);
//     const [ticketPrice, setTicketPrice] = useState<string>("0");
//     const [winAmount, setWinAmount] = useState<string>("0");

//     // Fetch current lottery info
//     const fetchLotteryInfo = async () => {
//         if (!account) return;
//         try {
//             const lotteryStore = await aptos.getAccountResource({
//                 accountAddress: moduleAddress,
//                 resourceType: `${moduleAddress}::DRaffle::LotteryStore`,
//             });
//             console.log("lotteryStore: ", lotteryStore);
//             setAllLotteryStore(lotteryStore);
//             console.log(
//                 "active lottery: ",
//                 lotteryStore.current_lottery["vec"][0]
//             );

//             setActiveLottery(lotteryStore?.current_lottery?.["vec"]?.[0]);
//         } catch (error) {
//             console.error("Error fetching lottery:", error);
//             setActiveLottery(null);
//         }
//     };

//     useEffect(() => {
//         fetchLotteryInfo();
//         // Set up polling to refresh data
//         const interval = setInterval(fetchLotteryInfo, 60000);
//         return () => clearInterval(interval);
//     }, [account?.address]);

//     // Initialize new lottery with proper error handling
//     const initializeLottery = async () => {
//         if (!account) {
//             notification.error({
//                 message: "Wallet not connected",
//                 description: "Please connect your wallet first",
//             });
//             return;
//         }

//         try {
//             setTransactionInProgress(true);

//             // Convert input values to BigInt strings (octas)
//             const ticketPriceOctas = BigInt(
//                 parseFloat(ticketPrice) * 100000000
//             ).toString();
//             const winAmountOctas = BigInt(
//                 parseFloat(winAmount) * 100000000
//             ).toString();

//             const transaction: InputTransactionData = {
//                 data: {
//                     function: `${moduleAddress}::DRaffle::initialize_lottery`,
//                     functionArguments: [ticketPriceOctas, winAmountOctas],
//                 },
//             };

//             const response = await signAndSubmitTransaction(transaction);

//             // Add a delay before checking transaction status
//             await new Promise((resolve) => setTimeout(resolve, 2000));

//             try {
//                 await aptos.waitForTransaction({
//                     transactionHash: response.hash,
//                     options: {
//                         timeoutSecs: 30, // Increase timeout
//                         checkSuccess: true, // Verify transaction success
//                     },
//                 });

//                 notification.success({
//                     message: "Success",
//                     description: "New lottery initialized successfully!",
//                 });

//                 await fetchLotteryInfo();
//             } catch (waitError: any) {
//                 throw new Error(
//                     `Transaction failed or timed out: ${waitError.message}`
//                 );
//             }
//         } catch (error: any) {
//             console.error("Lottery initialization error:", error);
//             notification.error({
//                 message: "Error",
//                 description: `Failed to initialize lottery: ${error.message}`,
//             });
//         } finally {
//             setTransactionInProgress(false);
//         }
//     };

//     // Buy lottery ticket
//     const buyTicket = async () => {
//         if (!account) return;
//         setTransactionInProgress(true);

//         const transaction: InputTransactionData = {
//             data: {
//                 function: `${moduleAddress}::DRaffle::buy_ticket`,
//                 functionArguments: [],
//             },
//         };

//         try {
//             const response = await signAndSubmitTransaction(transaction);
//             await aptos.waitForTransaction({
//                 transactionHash: response.hash,
//                 options: {
//                     checkSuccess: true,
//                 },
//             });
//             notification.success({
//                 message: "Success",
//                 description: "Ticket purchased successfully!",
//             });
//             fetchLotteryInfo();
//         } catch (error: any) {
//             notification.error({
//                 message: "Error",
//                 description: "Failed to buy ticket: " + error.message,
//             });
//         } finally {
//             setTransactionInProgress(false);
//         }
//     };

//     // Draw winner (admin only)
//     const drawWinner = async () => {
//         if (!account) return;
//         setTransactionInProgress(true);

//         const transaction: InputTransactionData = {
//             data: {
//                 function: `${moduleAddress}::DRaffle::draw_winner`,
//                 functionArguments: [],
//             },
//         };

//         try {
//             const response = await signAndSubmitTransaction(transaction);
//             await aptos.waitForTransaction({
//                 transactionHash: response.hash,
//                 options: {
//                     checkSuccess: true,
//                 },
//             });
//             notification.success({
//                 message: "Success",
//                 description: "Winner drawn successfully!",
//             });
//             fetchLotteryInfo();
//         } catch (error: any) {
//             notification.error({
//                 message: "Error",
//                 description: "Failed to draw winner: " + error.message,
//             });
//         } finally {
//             setTransactionInProgress(false);
//         }
//     };

//     return (
//         <Spin spinning={transactionInProgress}>
//             <Layout>
//                 <Row align="middle">
//                     <Col span={20} offset={2}>
//                         <h1>Decentralized Lottery</h1>
//                     </Col>
//                 </Row>

//                 {!activeLottery ? (
//                     <Row gutter={[0, 32]} style={{ marginTop: "2rem" }}>
//                         <Col span={8} offset={8}>
//                             <Card title="Create New Lottery">
//                                 <Input
//                                     placeholder="Ticket Price (in APT)"
//                                     value={ticketPrice}
//                                     onChange={(e) =>
//                                         setTicketPrice(e.target.value)
//                                     }
//                                     style={{ marginBottom: "1rem" }}
//                                 />
//                                 <Input
//                                     placeholder="Win Amount (in APT)"
//                                     value={winAmount}
//                                     onChange={(e) =>
//                                         setWinAmount(e.target.value)
//                                     }
//                                     style={{ marginBottom: "1rem" }}
//                                 />
//                                 <Button
//                                     block
//                                     type="primary"
//                                     onClick={initializeLottery}
//                                     disabled={!account}
//                                     style={{
//                                         height: "40px",
//                                         backgroundColor: "#3f67ff",
//                                     }}
//                                 >
//                                     Initialize Lottery
//                                 </Button>
//                             </Card>
//                         </Col>
//                     </Row>
//                 ) : (
//                     <Row gutter={[16, 16]} style={{ marginTop: "2rem" }}>
//                         <Col span={12} offset={6}>
//                             <Card title="Active Lottery" bordered={true}>
//                                 <p>Lottery ID: {activeLottery.lottery_id}</p>
//                                 <p>
//                                     Ticket Price: {activeLottery.ticket_price}{" "}
//                                     APT
//                                 </p>
//                                 <p>
//                                     Win Amount: {activeLottery.win_amount} APT
//                                 </p>
//                                 <p>
//                                     Participants:{" "}
//                                     {activeLottery.participants.length}
//                                 </p>
//                                 <p>
//                                     Status:{" "}
//                                     {activeLottery.is_active
//                                         ? "Active"
//                                         : "Ended"}
//                                 </p>
//                                 {activeLottery.winner && (
//                                     <p>Winner: To Be Declared</p>
//                                 )}

//                                 {activeLottery.is_active && (
//                                     <div style={{ marginTop: "1rem" }}>
//                                         <Button
//                                             type="primary"
//                                             onClick={buyTicket}
//                                             disabled={!account}
//                                             style={{ marginRight: "1rem" }}
//                                         >
//                                             Buy Ticket
//                                         </Button>

//                                         {account?.address === moduleAddress && (
//                                             <Button
//                                                 type="primary"
//                                                 onClick={drawWinner}
//                                                 danger
//                                             >
//                                                 Draw Winner
//                                             </Button>
//                                         )}
//                                     </div>
//                                 )}
//                             </Card>
//                         </Col>
//                     </Row>
//                 )}
//             </Layout>
//         </Spin>
//     );
// }
