"use client";

import { initializeLottery } from "../utils/aptosHelper";
import React, { useState } from "react";

function Lottery() {
    const [adminAddress, setAdminAddress] = useState("");
    const [ticketPrice, setTicketPrice] = useState(0);
    const [winAmount, setWinAmount] = useState(0);

    const initializeLotteryHandler = async () => {
        await initializeLottery(adminAddress, ticketPrice, winAmount);
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white text-black rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
                Initialize Lottery
            </h2>
            <div className="mb-4">
                <label
                    className="block text-sm font-medium text-gray-600 mb-2"
                    htmlFor="adminAddress"
                >
                    Admin Address
                </label>
                <input
                    id="adminAddress"
                    type="text"
                    placeholder="Admin Address"
                    value={adminAddress}
                    onChange={(e) => setAdminAddress(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>
            <div className="mb-4">
                <label
                    className="block text-sm font-medium text-gray-600 mb-2"
                    htmlFor="ticketPrice"
                >
                    Ticket Price
                </label>
                <input
                    id="ticketPrice"
                    type="number"
                    placeholder="Ticket Price"
                    value={ticketPrice}
                    onChange={(e) => setTicketPrice(Number(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>
            <div className="mb-6">
                <label
                    className="block text-sm font-medium text-gray-600 mb-2"
                    htmlFor="winAmount"
                >
                    Winning Amount
                </label>
                <input
                    id="winAmount"
                    type="number"
                    placeholder="Winning Amount"
                    value={winAmount}
                    onChange={(e) => setWinAmount(Number(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>
            <button
                onClick={initializeLotteryHandler}
                className="w-full py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
            >
                Initialize Lottery
            </button>
        </div>
    );
}

export default Lottery;
