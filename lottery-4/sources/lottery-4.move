module MyModule::DRaffle {
    use std::signer;
    use aptos_framework::coin;
    use aptos_framework::aptos_coin::AptosCoin;
    use std::vector;
    use aptos_framework::timestamp;
    use std::option::{Self, Option};

    /// Custom errors
    const ENOT_ADMIN: u64 = 1;
    const ELOTTERY_ALREADY_INITIALIZED: u64 = 2;
    const ELOTTERY_NOT_ACTIVE: u64 = 3;
    const EINSUFFICIENT_BALANCE: u64 = 4;
    const ELOTTERY_ALREADY_DRAWN: u64 = 5;
    const ENO_PARTICIPANTS: u64 = 6;
    const ESTORE_NOT_INITIALIZED: u64 = 7;

    const ADMIN_ADDRESS: address = @0x791bb225d446fad68fb3aab4da12f8d58561f8291765c13b139e5921a68680e7;

    struct LotteryInfo has store, drop, copy {
        lottery_id: u64,
        admin: address,
        ticket_price: u64,
        win_amount: u64,
        participants: vector<address>,
        is_active: bool,
        winner: Option<address>,
        start_time: u64,
        end_time: Option<u64>
    }

    struct LotteryStore has key {
        current_lottery: Option<LotteryInfo>,
        past_lotteries: vector<LotteryInfo>,
        total_lotteries: u64,
    }

    fun init_module(admin: &signer) {
        assert!(signer::address_of(admin) == ADMIN_ADDRESS, ENOT_ADMIN);
        
        if (!exists<LotteryStore>(ADMIN_ADDRESS)) {
            move_to(admin, LotteryStore {
                current_lottery: option::none(),
                past_lotteries: vector::empty(),
                total_lotteries: 0,
            });
        };
    }

    public entry fun initialize_lottery(
        admin: &signer,
        ticket_price: u64,
        win_amount: u64
    ) acquires LotteryStore {
        let admin_address = signer::address_of(admin);
        assert!(admin_address == ADMIN_ADDRESS, ENOT_ADMIN);
        assert!(exists<LotteryStore>(admin_address), ESTORE_NOT_INITIALIZED);

        let store = borrow_global_mut<LotteryStore>(admin_address);
        assert!(option::is_none(&store.current_lottery), ELOTTERY_ALREADY_INITIALIZED);

        store.total_lotteries = store.total_lotteries + 1;
        
        let new_lottery = LotteryInfo {
            lottery_id: store.total_lotteries,
            admin: admin_address,
            ticket_price,
            win_amount,
            participants: vector::empty(),
            is_active: true,
            winner: option::none(),
            start_time: timestamp::now_microseconds(),
            end_time: option::none(),
        };

        store.current_lottery = option::some(new_lottery);
    }

    public entry fun buy_ticket(
        buyer: &signer
    ) acquires LotteryStore {
        let store = borrow_global_mut<LotteryStore>(ADMIN_ADDRESS);
        assert!(option::is_some(&store.current_lottery), ELOTTERY_NOT_ACTIVE);
        
        let lottery = option::borrow_mut(&mut store.current_lottery);
        let buyer_addr = signer::address_of(buyer);
        
        assert!(lottery.is_active, ELOTTERY_NOT_ACTIVE);
        assert!(
            coin::balance<AptosCoin>(buyer_addr) >= lottery.ticket_price,
            EINSUFFICIENT_BALANCE
        );
        
        coin::transfer<AptosCoin>(
            buyer,
            lottery.admin,
            lottery.ticket_price
        );
        
        vector::push_back(&mut lottery.participants, buyer_addr);
    }

    public entry fun draw_winner(admin: &signer) acquires LotteryStore {
        let admin_address = signer::address_of(admin);
        assert!(admin_address == ADMIN_ADDRESS, ENOT_ADMIN);
        
        let store = borrow_global_mut<LotteryStore>(admin_address);
        assert!(option::is_some(&store.current_lottery), ELOTTERY_NOT_ACTIVE);
        
        let lottery = option::borrow_mut(&mut store.current_lottery);
        assert!(lottery.is_active, ELOTTERY_NOT_ACTIVE);
        assert!(!vector::is_empty(&lottery.participants), ENO_PARTICIPANTS);
        assert!(option::is_none(&lottery.winner), ELOTTERY_ALREADY_DRAWN);

        let participants_length = vector::length(&lottery.participants) as u64;
        let current_timestamp = timestamp::now_microseconds();
        let winner_index = current_timestamp % participants_length;
        let winner = *vector::borrow(&lottery.participants, winner_index);

        coin::transfer<AptosCoin>(admin, winner, lottery.win_amount);
        
        lottery.winner = option::some(winner);
        lottery.is_active = false;
        lottery.end_time = option::some(current_timestamp);

        // Move current lottery to past lotteries
        let finished_lottery = option::extract(&mut store.current_lottery);
        vector::push_back(&mut store.past_lotteries, finished_lottery);
    }

    #[view]
    public fun get_current_lottery(): Option<LotteryInfo> acquires LotteryStore {
        *&borrow_global<LotteryStore>(ADMIN_ADDRESS).current_lottery
    }

    #[view]
    public fun get_current_lottery_id(): Option<u64> acquires LotteryStore {
        let current_lottery = &borrow_global<LotteryStore>(ADMIN_ADDRESS).current_lottery;
        if (option::is_some(current_lottery)) {
            option::some(option::borrow(current_lottery).lottery_id)
        } else {
            option::none()
        }
    }

    #[view]
    public fun get_past_lottery(lottery_id: u64): Option<LotteryInfo> acquires LotteryStore {
        let store = borrow_global<LotteryStore>(ADMIN_ADDRESS);
        let past_lotteries = &store.past_lotteries;
        let i = 0;
        let len = vector::length(past_lotteries);
        
        while (i < len) {
            let lottery = vector::borrow(past_lotteries, i);
            if (lottery.lottery_id == lottery_id) {
                return option::some(*lottery)
            };
            i = i + 1;
        };
        
        option::none()
    }

    #[view]
    public fun get_total_lotteries(): u64 acquires LotteryStore {
        borrow_global<LotteryStore>(ADMIN_ADDRESS).total_lotteries
    }

    #[view]
    public fun get_all_past_lotteries(): vector<LotteryInfo> acquires LotteryStore {
        *&borrow_global<LotteryStore>(ADMIN_ADDRESS).past_lotteries
    }

    #[view]
    public fun is_active(): bool acquires LotteryStore {
        let store = borrow_global<LotteryStore>(ADMIN_ADDRESS);
        if (option::is_some(&store.current_lottery)) {
            option::borrow(&store.current_lottery).is_active
        } else {
            false
        }
    }

    #[view]
    public fun get_ticket_price(): Option<u64> acquires LotteryStore {
        let current_lottery = &borrow_global<LotteryStore>(ADMIN_ADDRESS).current_lottery;
        if (option::is_some(current_lottery)) {
            option::some(option::borrow(current_lottery).ticket_price)
        } else {
            option::none()
        }
    }

    #[view]
    public fun get_participants(): vector<address> acquires LotteryStore {
        let current_lottery = &borrow_global<LotteryStore>(ADMIN_ADDRESS).current_lottery;
        if (option::is_some(current_lottery)) {
            *&option::borrow(current_lottery).participants
        } else {
            vector::empty()
        }
    }

    #[view]
    public fun get_winner(): Option<address> acquires LotteryStore {
        let current_lottery = &borrow_global<LotteryStore>(ADMIN_ADDRESS).current_lottery;
        if (option::is_some(current_lottery)) {
            *&option::borrow(current_lottery).winner
        } else {
            option::none()
        }
    }
}