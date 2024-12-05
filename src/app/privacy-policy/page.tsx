'use client'
import React, { useState, useEffect } from 'react';

const PrivacyPolicy = () => {
    const [activeSection, setActiveSection] = useState('introduction');

    const sections = [
        { id: 'introduction', image: 'https://vacationsaga.b-cdn.net/assets/suitcase.png' },
        { id: 'data-collection', image: 'https://vacationsaga.b-cdn.net/assets/attachi.png' },
        { id: 'third-party', image: 'https://vacationsaga.b-cdn.net/assets/contract.png' },
        { id: 'property-rights', image: 'https://vacationsaga.b-cdn.net/assets/badge.png' },
        { id: 'User-content', image: 'https://vacationsaga.b-cdn.net/assets/letter.png' },
        { id: 'important', image: 'https://vacationsaga.b-cdn.net/assets/direction.png' },
        
    ];

    const handleScroll = () => {
        const sectionElements = sections.map((section) =>
            document.getElementById(section.id)
        );
        const currentSection = sectionElements.find(
            (section: any) =>
                section?.getBoundingClientRect().top <=150 &&
                section?.getBoundingClientRect().bottom > 100
        );
        if (currentSection) {
            setActiveSection(currentSection.id);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const getCurrentImage = () => {
        const section = sections.find((sec) => sec.id === activeSection);
        return section ? section.image : '/images/default.jpg';
    };

    return (
        <div className="privacy-policy-container mx-auto p-6 max-w-7xl flex">
            {/* Left Side: Scrolling Content */}
            <div className="sm:w-1/2 w-full pr-8 overflow-y-auto">
                <h1 className="text-4xl font-bold text-orange-500 mb-6">Privacy Policy</h1>

                <section id="introduction" className="mb-12 ">
                    <h2 className="text-3xl font-semibold text-orange-500 mb-4">Introduction</h2>
                    <p className='sm:text-xl text-base'>The term "Users" and "customers" refers to people who use our website to find a suitable rental 
as well as to those who list their property with us. Your personal information will be collected 
and stored by us in our data base and will not be shared with any third party .</p>
                    <p className='sm:text-xl text-base'>By using our website, you consent to the collection and transfer of
                    your data, including to other countries where we have branches.</p>
                </section>

                <section id="data-collection" className="mb-12">
                    <h2 className="text-3xl font-semibold text-orange-500 mb-4">Data Collection and Storage</h2>
                    <ul className="list-disc pl-6">
                    <li className='sm:text-xl text-base'>Your personal information is collected and stored in our database.</li>
          <li className='sm:text-xl text-base'>We will not share your information with any third party.</li>
          <li className='sm:text-xl text-base'>We do not knowingly collect data from users under 18.</li>
                    </ul>
                </section>

                <section id="third-party" className="mb-12">
                    <h2 className="text-3xl font-semibold text-orange-500 mb-4">Third-Party Agreements</h2>
                    <p className='sm:text-xl text-base'>We are not responsible for any agreements between users, including:</p>
                    <ul className="list-disc pl-6">
                    <li className='sm:text-xl text-base'>Disputes over property quality or condition.</li>
                    <li className='sm:text-xl text-base'>Reservation agreements between travelers and property owners.</li>
                    </ul>
                    <p className='sm:text-xl text-base m-5'> we act as a middleman to facilitate smooth transaction between the holiday maker and the property owner</p>
                </section>


                <section id="property-rights" className="mb-12 ">
                    <h2 className="text-3xl font-semibold text-orange-500 mb-4">Intellectual Property and Usage Rights</h2>
                    <p className='sm:text-xl text-base'>The content on our website belongs solely to us. You may download it for personal use but cannot copy or reuse it without our consent.</p>
                    <p className='sm:text-xl text-base'> Users are granted a limited license to access the content and services provided by us.
                    </p>
                    
                </section>

                <section id="User-content" className="mb-12 ">
                    <h2 className="text-3xl font-semibold text-orange-500 mb-4">User Consent and Prohibited Activities</h2>
                    <ul className="list-disc pl-6">
                    <li className='sm:text-xl text-base'>Using the website for unauthorized purposes.</li>
                    <li className='sm:text-xl text-base'>Modifying, translating, or altering any content on the website.</li>
                    <li className='sm:text-xl text-base'>Selling, offering to sell, transferring, or licensing the website to any third party.</li>
                    <li className='sm:text-xl text-base'>Posting abusive, unlawful, or defamatory content on the website.
                    </li>
                    <li className='sm:text-xl text-base'>Infringing upon or violating the rights of the company or any third party.</li>
                    <li className='sm:text-xl text-base'> Transmitting fraudulent, false, or misleading information.</li>
                    </ul>
                    
                </section>

                <section id="important" className="mb-12 ">
                    <h2 className="text-3xl font-semibold text-orange-500 mb-4">Important information</h2>
                    <ul className="list-disc pl-6 flex flex-col gap-y-2" >
                    <li className='sm:text-xl text-base'>We do not make any exclusive contract with our registered property owners and registered travelers 
                    which means you are totally free to work with other companies while working with our company</li>
                    <li className='sm:text-xl text-base'>MWe may provide you with an online payment portal for your connivance but we are not liable for
any losses you suffer due to the decision of PayPal and bank. In case your payment is declined 
by PayPal or by bank, you must directly contact them and we are not accountable for the same. You 
agree to indemnify us from or against any or all the claims or legal fees incurred by you
against an action brought by you against the payment gateway. In case you need any assistance 
regarding approval of your payments, you can directly reach to PayPal or bank's customer support</li>
                    <li className='sm:text-xl text-base'>In case you find any content, video or photos defamatory or against public policy, you can notify us 
                    on the email address provided on the website, mentioning the reason as to why you find the material inappropriate</li>
                    <li className='sm:text-xl text-base'>We provide advertising services for our registered customers and we also serve as in accommodation search system 
                    to our travelers, we don't assure personal inspections of the property. We cannot confirm the deals accuracy 
                    </li>
                    <li className='sm:text-xl text-base'> we shall only be liable for any direct loss incurred by you due to our website and not for any indirect losses.
                    Our liability will not arise In case of breach of contract or negligence, resulting in business losses</li>
                    <li className='sm:text-xl text-base'> Transmitting fraudulent, false, or misleading information.</li>
                    </ul>
                    
                </section>

                
            </div>

            {/* Right Side: Fixed Image */}
            <div className="hidden w-1/2 -z-50  bg-white h-screen sm:flex justify-center items-center">
                <img
                    src={getCurrentImage()}
                    alt="Section Illustration"
                    className="w-72  fixed top-28"
                />
            </div>
        </div>
    );
};

export default PrivacyPolicy;
