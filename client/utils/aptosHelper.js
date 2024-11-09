import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";

// Set up the Aptos client
const aptosConfig = new AptosConfig({ network: Network.TESTNET });
const aptos = new Aptos(aptosConfig);

export async function initializeLottery(adminAddress, ticketPrice, winAmount) {
    const transaction = await aptos.transaction.build.simple({
        sender: adminAddress,
        data: {
            function: "0x1::MyModule::initialize_lottery",
            functionArguments: [ticketPrice, winAmount],
        },
    });

    const signedTransaction = await aptos.signAndSubmitTransaction({
        signer: adminAddress,
        transaction,
    });

    const executedTransaction = await aptos.waitForTransaction({
        transactionHash: signedTransaction.hash,
    });

    console.log("Lottery Initialized", executedTransaction);
}

export async function buyTicket(buyerAddress, adminAddress) {
    const transaction = await aptos.transaction.build.simple({
        sender: buyerAddress,
        data: {
            function: "0x1::MyModule::buy_ticket",
            functionArguments: [adminAddress],
        },
    });

    const signedTransaction = await aptos.signAndSubmitTransaction({
        signer: buyerAddress,
        transaction,
    });

    const executedTransaction = await aptos.waitForTransaction({
        transactionHash: signedTransaction.hash,
    });

    console.log("Ticket Bought", executedTransaction);
}

export async function drawWinner(adminAddress) {
    const transaction = await aptos.transaction.build.simple({
        sender: adminAddress,
        data: {
            function: "0x1::MyModule::draw_winner",
            functionArguments: [],
        },
    });

    const signedTransaction = await aptos.signAndSubmitTransaction({
        signer: adminAddress,
        transaction,
    });

    const executedTransaction = await aptos.waitForTransaction({
        transactionHash: signedTransaction.hash,
    });

    console.log("Winner Drawn", executedTransaction);
}
export async function getLotteryInfo(adminAddress) {
    const result = await aptos.view({
        function: "0x1::MyModule::get_lottery_info",
        arguments: [adminAddress],
    });

    console.log("Lottery Info:", result);
    return result;
}

export async function isLotteryActive(adminAddress) {
    const result = await aptos.view({
        function: "0x1::MyModule::is_active",
        arguments: [adminAddress],
    });

    console.log("Is Lottery Active:", result);
    return result;
}

export async function getTicketPrice(adminAddress) {
    const result = await aptos.view({
        function: "0x1::MyModule::get_ticket_price",
        arguments: [adminAddress],
    });

    console.log("Ticket Price:", result);
    return result;
}

export async function getParticipants(adminAddress) {
    const result = await aptos.view({
        function: "0x1::MyModule::get_participants",
        arguments: [adminAddress],
    });

    console.log("Participants:", result);
    return result;
}
