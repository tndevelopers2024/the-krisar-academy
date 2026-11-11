import { Link } from 'react-router-dom'
import '../../assets/styles/fonts.css'

const NavbarTop = () => {
    return (
        <>
            <div className="bg-brand-secondary text-brand-primary overflow-hidden py-1.5 px-4 relative z-50 flex flex-col md:flex-row items-center justify-center md:justify-between gap-1 md:gap-0 text-xs md:text-sm font-semibold">
                <div className='animate-marquee hidden md:block'>
                    <span className="tracking-wide">Learners Today, Leaders Tomorrow.</span>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-2 md:gap-0">
                    <Link to="/erp-and-payment" className="hover:underline whitespace-nowrap">ERP &amp; Payment</Link>
                    <span className="sm:inline mx-1.5 md:mx-3 text-brand-primary/30">|</span>
                    <Link to="/cbse-disclosure" className="hover:underline whitespace-nowrap">CBSE Disclosure</Link>
                    <span className="sm:inline mx-1.5 md:mx-3 text-brand-primary/30">|</span>
                    <Link to="/admissions" className="hover:underline text-center">Admission Registration Form</Link>
                </div>
            </div>
        </>
    )
}

export default NavbarTop;