import { TrendingUp, Zap, PieChart, CheckCircle2 } from 'lucide-react'

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-4xl text-center">
                    <div className="inline-block mb-6 rounded-full bg-blue-100 px-4 py-2">
                        <span className="text-sm font-medium text-blue-600">
                            100% free finance tracking
                        </span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight text-balance">
                        Don't just track money.
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
                            Track each income separately.
                        </span>
                    </h1>

                    <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                        Multiple income streams? Multiple goals? BucketPay lets you organize your finances with separate "income buckets" so you know exactly where every dollar goes—and what you have left.
                    </p>
                </div>

                {/* Hero Visual */}
                <div className="mt-12 sm:mt-16 mx-auto max-w-4xl">
                    <div className="relative rounded-2xl bg-gradient-to-b from-blue-50 to-slate-50 border border-blue-100 p-6 sm:p-10 md:p-12">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {[
                                { label: 'Salary', amount: '$4,200' },
                                { label: 'Freelance', amount: '$1,850' },
                                { label: 'Investments', amount: '$920' }
                            ].map((bucket) => (
                                <div key={bucket.label} className="rounded-xl bg-white border border-slate-200 p-4 sm:p-6 text-center shadow-sm">
                                    <div className="text-sm font-medium text-slate-600 mb-2">{bucket.label}</div>
                                    <div className="text-xl sm:text-2xl font-bold text-slate-900">{bucket.amount}</div>
                                    <div className="text-xs text-slate-500 mt-2">Available</div>
                                </div>
                            ))}
                        </div>
                        <div className="absolute top-0 right-0 h-24 w-24 sm:h-32 sm:w-32 bg-blue-200 rounded-full blur-3xl opacity-20 -z-10" />
                    </div>
                </div>
            </section>

            {/* Problem & Solution */}
            <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
                <div className="mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                        <div>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                                The problem with traditional budgeting
                            </h2>
                            <ul className="space-y-4">
                                {[
                                    'You can’t see which income paid for what',
                                    'Multiple income sources blur together',
                                    'Hard to understand real spending patterns',
                                    'No clarity on separate financial goals'
                                ].map((item) => (
                                    <li key={item} className="flex gap-3 items-start">
                                        <div className="h-5 w-5 rounded-full bg-slate-300 flex-shrink-0 mt-1" />
                                        <span className="text-base sm:text-lg text-slate-700">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                                The BucketPay way
                            </h2>
                            <ul className="space-y-4">
                                {[
                                    'Separate income into distinct buckets',
                                    'Assign expenses to the income that pays for them',
                                    'See spending patterns by income source',
                                    'Take control of your multi-income finances'
                                ].map((item) => (
                                    <li key={item} className="flex gap-3 items-start">
                                        <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 flex-shrink-0 mt-0.5" />
                                        <span className="text-base sm:text-lg text-slate-700 font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-6xl">
                    <div className="text-center mb-12 sm:mb-16">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                            Built for your financial life
                        </h2>
                        <p className="text-base sm:text-lg md:text-xl text-slate-600">
                            Everything you need to manage multiple income streams with clarity
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {[
                            {
                                icon: PieChart,
                                title: 'Income Buckets',
                                description: 'Create separate buckets for each income source and watch them fill with earnings.'
                            },
                            {
                                icon: TrendingUp,
                                title: 'Smart Assignment',
                                description: 'Assign expenses to the specific income bucket that paid for them.'
                            },
                            {
                                icon: Zap,
                                title: 'Real-time Insights',
                                description: 'See exactly how much remains in each bucket and understand spending patterns.'
                            }
                        ].map((feature) => {
                            const Icon = feature.icon
                            return (
                                <div key={feature.title} className="rounded-2xl border border-slate-200 p-6 sm:p-8 hover:border-blue-200 hover:bg-blue-50 transition-all">
                                    <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                                        <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3">
                                        {feature.title}
                                    </h3>
                                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-blue-800">
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">
                        Ready to control your finances?
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-8">
                        It's completely free. No credit card needed.
                    </p>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-slate-200 py-10 sm:py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
                <div className="mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700" />
                                <span className="font-semibold text-slate-900">BucketPay</span>
                            </div>
                            <p className="text-sm text-slate-600">
                                Track each income separately, not your money as one.
                            </p>
                        </div>

                        {[
                            { title: 'Product', links: ['Features', 'Security', 'Status'] },
                            { title: 'Resources', links: ['Help Center', 'FAQ', 'Contact'] },
                            { title: 'Legal', links: ['Privacy', 'Terms', 'Cookies'] }
                        ].map((col) => (
                            <div key={col.title}>
                                <h4 className="font-semibold text-slate-900 mb-4">{col.title}</h4>
                                <ul className="space-y-2">
                                    {col.links.map((link) => (
                                        <li key={link}>
                                            <a href="#" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                                                {link}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-slate-200 pt-6 sm:pt-8 text-center text-xs sm:text-sm text-slate-600">
                        <p>&copy; 2024 BucketPay. A free tool for tracking multiple income streams.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}