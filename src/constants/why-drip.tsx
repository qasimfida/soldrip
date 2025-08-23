import Refresh from "@/components/icons/refresh"
import Hands from "@/components/icons/hands"
import Growth from "@/components/icons/growth"
import Deflation from "@/components/icons/deflation"
import Money from "@/components/icons/money"
import Waterfall from "@/components/icons/waterfall"
import type { WhyDripItem } from "@/types/why-drip"

export const WHY_DRIP: WhyDripItem[] = [
    {
        name: "HODL",
        icon: Refresh,
        title: "Rewards",
        highlight: "Automatic SOL",
        description: "HODL $DRIP, and on a regular interval your wallet gets a fresh drop of SOL. Yes, you read that right: set it and collect."
    },
    {
        name: "REWARDS",
        icon: Hands,
        title: "All",
        highlight: "Rewards for ",
        description: "69% of every reward is dropped to holders with at least 250,000 $DRIP tokens in their wallet."
    },
    {
        name: "UTILITY",
        icon: Growth,
        title: "Utility ",
        highlight: "Growing",
        description: "$DRIP isn’t just a token—it’s your key to a growing Solana ecosystem of apps, games, and rewards."
    },
    {
        name: "DEFLATION",
        icon: Deflation,
        title: "Forever",
        highlight: "Deflation",
        description: "7% of every transaction is burned, shrinking supply and boosting your advantage."
    },
    {
        name: "DIVIDENDS",
        icon: Money,
        title: <span className="block text-gradient-white"> COMMUNITY-BACKED </span>,
        highlight: "DIVIDENDS",
        description: "As usage grows, so does the reward pool; without needing to sell the token. "
    },
    {
        name: "DEPENDABLE",
        icon: Waterfall,
        title: "Rewards",
        highlight: "Dependable",
        description: "Not just pump-and-dump: Sol Drip pays, even on quiet days with no volume."
    },
]
export const WHY_DRIP_EXPERIENCE: WhyDripItem[] = [
    {
        name: "drip",
        icon: Money,
        title: "acquire drip",
        highlight: "",
        description: "Swap as little as 1 SOL via Jupiter."
    },
    {
        name: "participate",
        icon: Hands,
        title: "participate",
        highlight: "",
        description: "Play, trade, and engage across the ecosystem."
    },
    {
        name: "earn",
        icon: Growth,
        title: "Earn",
        highlight: "",
        description: "Rewards arrive at varying intervals, keeping engagement fresh."
    },
]