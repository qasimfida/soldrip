import { useState } from 'react'
import { Container } from './container'
import Title from './title'
import FaqBg from '@/assets/road-map.jpg'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import TelegramIcon from './icons/telegram-icon'
const { VITE_DRIP_TOKEN_ADDRESS } = import.meta.env;


const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: "How can you pay rewards if there is no or low volume?",
      answer: <>A portion of the tax revenue from token transfers is used to top up the treasury for low volume periods. Our treasury includes tokens from other projects that pay a SOL dividend. We are working with yield platforms to generate SOL for the distribution wallet. Projects, such as <a href="http://deepfi.tools" target='_blank' className='text-primary'>DeepFi.tools</a>, also contribute to the treasury’s reserve.<br /><br />We encourage all large bag holders to contribute their rewards to the treasury, ensuring that we consistently reward everyone in our community. Consistent rewards encourage people to hold and grow our community: <a href="https://solscan.io/account/9WiHZF9asn2k58mbXJaa9kxKzniW3jSyAoQiZAMciis" target='_blank' className='text-primary'>https://solscan.io/account/9WiHZF9asn2k58mbXJaa9kxKzniW3jSyAoQiZAMciis</a>
      </>
    },
    {
      question: "How often do you add liquidity to the liquidity pool (LP)?",
      answer: <>We do not have a schedule to add liquidity to the LP. For LP adds we use DEV wallet when we meet some threshold. Community leads and large bag holders have also supported the LP from their personal funds.
        <br /><br /> If you’re interested in adding to the liquidity pool, please reach out to the admins or owner in <a href="https://t.me/SolDrip_Rewards" target='_blank' className='text-primary'>Telegram</a>.


      </>
    },
    {
      question: "Why should I partner with the SOL Drip community?",
      answer: "If your meme community needs a steady income for marketing and promotion, one of the easiest ways to achieve this is to hold $DRIP in your treasury wallet. Ask your community to purchase $DRIP and contribute it to its treasury wallet. Over time, you’ll notice a steadily increasing balance of SOL that can be put towards your marketing and administrative expenses."
    },
    {
      question: "Who is in charge of SOL Drip?",
      answer: <>While the project was started by a single Dev, it belongs to the community now. The treasury is locked, the liquidity pool is locked, and it’s up to the community to pump our bags. If you’re looking for help or direction, ask in our <a href="https://t.me/SolDrip_Rewards" target='_blank' className='text-primary'>Telegram group</a>. Seek out partnerships with others in the community to bring about change. For example, this website was created by someone in the community, not the original developer.
      </>
    },
    {
      question: "How are distributions calculated?",
      answer: <>
        There are one of two ways rewards can be calculated. You can verify how the method is used by checking the <a href={`http://revshare.dev/token-landing/${VITE_DRIP_TOKEN_ADDRESS}`} target='_blank' className='text-primary'>REVSHARE token page</a>.
        <br />
        <br />
        The first method is through a proportional distribution method by which every eligible wallet is given its proportional share of the SOL being distributed during that interval.
        <br />
        <br />
        The second method is through a Square Root Distribution Formula:
        <br /><br />
        A_i = T × (√B_i) / (Σ√B_j)
        <br /><br />
        Where:
        <br />
        - A_i = Amount distributed to holder i
        <br />
        - T = Total tokens to distribute
        <br />
        - B_i = Balance of holder i
        <br />
        - √B_i = Square root of holder i's balance
        <br />
        - Σ√B_j = Sum of square roots of all holders' balances
        <br />
        - j = 1 to n (all holders)
        <br /><br />
        Example calculation:
        <br />
        If the holder has a balance of 10000 and total sqrt weights = 500:
        <br />
        Amount = Total_tokens × √10000 / 500
        <br />
        Amount = Total_tokens × 100 / 500
        <br />
        Amount = Total_tokens × 0.2 (20% of distribution)
        <br /><br />
      </>
    },
    {
      question: <>How can I contribute to growing our market cap?<br /> (I don’t have any skills)</>,
      answer: <> Cults like ours need evangelists, and evangelists don’t need any skills.We simply need you to take action: participate in Telegram raids, vote for us on DEX screener and token websites such as CoinGecko, DexScreener, and MoonTok.You should also post memes from the Telegram on X.Create posts on Reddit sharing why you believe in SOL Drip and our vision.Vote for our skills)? Reddit posts.Tell your friends and family to purchase at least 100,000 SOL Drip tokens.It’s easy to help grow your bags by just taking a few actions each day.
      </>
    },
    {
      question: <>How can I contribute to growing our market cap?<br />(I have skills)</>,
      answer: <>
        For artists– please create memes and share them on Telegram and social media. We need short form videos for TikTok and Reels as well as stickers and memes for Telegram and X.
        <br />
        <br />
        For developers– create projects that utilize $DRIP. Create online games and tools that require $DRIP, accept $DRIP as a form of payment, or reward users in $DRIP. Considering taking a portion of the revenue from these projects to supply the $DRIP liquidity pool on Raydium. You’ll earn fees and help maintain the market for $DRIP tokens.
      </>
    },
    {
      question: "Where can I download the SOL Drip logos?",
      answer: <>You may download the logos  <a href="https://mega.nz/folder/hagWxbiY#Vn-8zJE5YyRe-n21rOVhLg" target='_blank' className='text-primary'>here:</a></>
    }
  ]
  // background: linear - gradient(180deg, rgba(0, 0, 0, 0) 0 %, #1A1F2C 100 %);


  return (
    <section className="">
      <div className="relative bg-cover no-repeat" style={{ backgroundImage: `url(${FaqBg})` }} >
        <div className="absolute top-0 left-0 w-full h-full bg-linear-180 from-transparent to-[#1A1F2C] "></div>
        <Container className="relative z-10">
          <div className="px-6 py-7 md:py-25">
            <Title className='text-center text-white'>Frequently Asked Questions</Title>
            <p className="mt-3 text-center text-gray-200"> Here are the answers to our most frequently asked questions. If your questions are not addressed here, please visit our <a href="https://t.me/SolDrip_Rewards" target='_blank' className='text-primary'>Telegram</a> and ask the community for assistance.</p>
          </div>
        </Container>
      </div >
      <Container>
        <div className="mx-auto mt-16 space-y-6 max-w-3xl md:space-y-8 md:mt-12">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="overflow-hidden px-3 py-5 rounded-lg border bg-primary/10 border-primary/20 shadow-primary md:px-13 md:py-4"
            >
              <div
                onClick={() => toggleAccordion(index)}
                className={cn(
                  "flex justify-between items-center w-full text-left transition-colors"
                )}
              >
                <h3 className="pr-4 text-base font-bold text-white md:text-xl">{item.question}</h3>
                <div className={cn(`border shrink-0 rounded-full w-9 h-9 border-primary flex items-center justify-center mr-4 `, openIndex === index ? "bg-primary" : "")}>

                  {openIndex === index ? (
                    <ChevronUp className="flex-shrink-0 w-6 h-6 text-white" />
                  ) : (
                    <ChevronDown className="flex-shrink-0 w-6 h-6 text-white" />
                  )}
                </div>
              </div>
              <div
                className={cn(
                  " overflow-hidden transition-all duration-300 ease-in-out",
                  openIndex === index
                    ? "max-h-auto opacity-100 "
                    : "max-h-0 opacity-0"
                )}
              >
                <p className="text-base text-white pt-2.5  md:pt-3">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
      <Container className="relative mx-auto my-16 max-w-4xl md:my-17 lg:px-12">

        <div className="overflow-hidden relative px-4 py-7 bg-cover rounded-lg border no-repeat shadow-primary border-primary/20 md:px-13 md:py-15" style={{ backgroundImage: `url(${FaqBg})` }} >

          <div className="absolute top-0 left-0 z-0 w-full h-full bg-black/40"></div>
          <div className='relative z-10'>
            <h4 className='text-[32px] font-bold text-center text-white mb-2.5'>Do you need additional assistance</h4>
            <p className="mt-3 text-center text-gray-200">Here are answers to our most common questions. If your questions are not addressed here, please visit our Telegram group and ask the community. </p>
            <Button size={'lg'} className='flex mx-auto border shadow-primary bg-gradient-primary border-white/50 w-[240px] mt-7' >Telegram <TelegramIcon className='!w-8 !h-8 ml-2.5' /></Button>
          </div>
        </div>
      </Container>
    </section >
  )
}

export default FAQ 