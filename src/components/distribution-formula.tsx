import Title from "@/components/title"
import { Container } from "./container"
import 'animate.css'

const DistributionFormula = () => {
    return (
        <section id="distribution-formula" className="py-20 bg-background">
            <Container>
                <div className="text-center animate__animated animate__fadeInUp">
                    <Title>
                        Fair Distribution Model
                    </Title>
                    <p className="mt-4 text-lg text-white md:text-xl">
                        Our unique square root distribution formula ensures a fair reward system for all token holders.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-12 mt-16 md:grid-cols-2">
                    {/* Formula Section */}
                    <div className="p-8 border rounded-lg shadow-lg animate__animated animate__fadeInLeft border-primary/20 bg-primary/10">
                        <Title type="heading">
                            Square Root Distribution Formula
                        </Title>
                        <div className="mt-6 text-2xl font-mono text-secondary">
                            <p>A_i = T × (√B_i) / (Σ√B_j)</p>
                        </div>
                        <ul className="mt-6 space-y-4 text-white">
                            <li><span className="font-bold text-secondary">A_i</span> = Amount distributed to holder i</li>
                            <li><span className="font-bold text-secondary">T</span> = Total tokens to distribute</li>
                            <li><span className="font-bold text-secondary">B_i</span> = Balance of holder i</li>
                            <li><span className="font-bold text-secondary">√B_i</span> = Square root of holder i's balance</li>
                            <li><span className="font-bold text-secondary">Σ√B_j</span> = Sum of square roots of all holders' balances</li>
                            <li><span className="font-bold text-secondary">j</span> = 1 to n (all holders)</li>
                        </ul>
                    </div>

                    {/* Example Calculation Section */}
                    <div className="p-8 border rounded-lg shadow-lg animate__animated animate__fadeInRight border-primary/20 bg-primary/10">
                        <Title type="heading">
                            Example Calculation
                        </Title>
                        <p className="mt-6 text-white">
                            If a holder has a balance of <strong>10,000 tokens</strong> and the sum of square root weights of all holders is <strong>500</strong>:
                        </p>
                        <div className="mt-6 font-mono text-lg text-white">
                            <p>Amount = Total_tokens × √10000 / 500</p>
                            <p>Amount = Total_tokens × 100 / 500</p>
                            <p className="mt-4 text-xl font-bold text-secondary">Amount = Total_tokens × 0.2 (20% of distribution)</p>
                        </div>
                        <p className="mt-6 text-white">
                            This model significantly benefits smaller holders, promoting a more equitable distribution of rewards compared to a linear model.
                        </p>
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default DistributionFormula 