import { AptosClient, AptosAccount } from "aptos";
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";

// Aptos Testnet Client Configuration
const aptosConfig = new AptosConfig({ network: Network.TESTNET });
export const aptos = new Aptos(aptosConfig);

// Full node URL for Aptos Testnet
const NODE_URL = "https://fullnode.testnet.aptoslabs.com/v1";

// Initialize Aptos Client
const aptosClient = new AptosClient(NODE_URL);

export async function initializeLottery(ticketPrice, winAmount) {
    const sender = new AptosAccount(); // Create a new account or use an existing one
    const payload = {
        type: "entry_function_payload",
        function: "0x1::Lottery::initialize_lottery",
        arguments: [ticketPrice.toString(), winAmount.toString()],
        type_arguments: [],
    };

    const txn = await aptosClient.generateTransaction(
        sender.address(),
        payload
    );
    const signedTxn = await aptosClient.signTransaction(sender, txn);
    const txnHash = await aptosClient.submitTransaction(signedTxn);
    await aptosClient.waitForTransaction(txnHash);
    console.log(`Lottery initialized with transaction hash: ${txnHash}`);
}

export async function buyTicket(adminAddress, ticketPrice) {
    const sender = new AptosAccount(); // Account of the user buying the ticket
    const payload = {
        type: "entry_function_payload",
        function: "0x1::Lottery::buy_ticket",
        arguments: [adminAddress],
        type_arguments: [],
    };

    // First transfer AptosCoin to the admin
    const txn = await aptosClient.generateTransaction(
        sender.address(),
        payload
    );
    const signedTxn = await aptosClient.signTransaction(sender, txn);
    const txnHash = await aptosClient.submitTransaction(signedTxn);
    await aptosClient.waitForTransaction(txnHash);
    console.log(`Ticket bought with transaction hash: ${txnHash}`);
}

export async function drawWinner() {
    const adminAccount = new AptosAccount(); // Admin account to draw the winner
    const payload = {
        type: "entry_function_payload",
        function: "0x1::Lottery::draw_winner",
        arguments: [],
        type_arguments: [],
    };

    const txn = await aptosClient.generateTransaction(
        adminAccount.address(),
        payload
    );
    const signedTxn = await aptosClient.signTransaction(adminAccount, txn);
    const txnHash = await aptosClient.submitTransaction(signedTxn);
    await aptosClient.waitForTransaction(txnHash);
    console.log(`Winner drawn with transaction hash: ${txnHash}`);
}

export async function getLotteryInfo(adminAddress) {
    const response = await aptosClient.getAccountResource(
        adminAddress,
        "0x1::Lottery::LotteryInfo"
    );
    const lotteryInfo = response.data;
    console.log(lotteryInfo);
    return lotteryInfo;
}
