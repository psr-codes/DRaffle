"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { ethers } from "ethers";

const LotteryForm = () => {
    const [ticketPrice, setTicketPrice] = useState("");
    const [winAmount, setWinAmount] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate inputs
        if (!ticketPrice || !winAmount) {
            toast.error("Please fill in both fields!");
            return;
        }

        try {
            setLoading(true);

            // Connect to Aptos (use ethers.js for now to simulate)
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            // Simulating calling the smart contract (Aptos interaction would be different)
            const contractAddress = "your_contract_address_here";
            const abi = [
                // ABI for your contract
                "function initialize_lottery(address admin, uint64 ticket_price, uint64 win_amount) public",
            ];
            const contract = new ethers.Contract(contractAddress, abi, signer);

            const transaction = await contract.initialize_lottery(
                await signer.getAddress(), // Admin's address
                ethers.utils.parseUnits(ticketPrice, "ether"), // Convert ticket price to ether units
                ethers.utils.parseUnits(winAmount, "ether") // Convert win amount to ether units
            );

            await transaction.wait();
            toast.success("Lottery Created Successfully!");
        } catch (err) {
            console.error("Error:", err);
            toast.error("Failed to create lottery");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-8 text-black">
            <h1 className="text-2xl font-bold mb-6 text-center">
                Create Lottery
            </h1>
            <form
                onSubmit={handleSubmit}
                className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg"
            >
                <div className="mb-4">
                    <label
                        htmlFor="ticketPrice"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Ticket Price (in Ether)
                    </label>
                    <input
                        type="text"
                        id="ticketPrice"
                        value={ticketPrice}
                        onChange={(e) => setTicketPrice(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Enter ticket price"
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="winAmount"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Win Amount (in Ether)
                    </label>
                    <input
                        type="text"
                        id="winAmount"
                        value={winAmount}
                        onChange={(e) => setWinAmount(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Enter win amount"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-md focus:outline-none hover:bg-indigo-700 disabled:opacity-50"
                >
                    {loading ? "Creating..." : "Create Lottery"}
                </button>
            </form>
        </div>
    );
};

export default LotteryForm;
