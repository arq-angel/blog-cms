import React, {useState, useRef, useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUserTie, faCaretDown, faEnvelope, faGear, faArrowRightFromBracket} from '@fortawesome/free-solid-svg-icons';
import {Link} from "@inertiajs/react";


export default function ProfileDropDown() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (<div className="relative inline-block text-left"  ref={dropdownRef}>
        <button
            onClick={toggleDropdown}
            className="text-white text-sm ml-2 flex items-center hover:text-gray-300"
        >
            <FontAwesomeIcon icon={faUserTie} className="me-1"/>
            Profile
            <FontAwesomeIcon icon={faCaretDown} className="ms-1"/>
        </button>

        {dropdownOpen && (
            <div className="absolute right-0 mt-6 -me-3.5 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                <div className="py-1">
                    <Link href="#">
                        <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            <FontAwesomeIcon icon={faUserTie} className="me-1"/>Profile
                        </a>
                    </Link>
                    <Link href="#">
                        <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            <FontAwesomeIcon icon={faEnvelope} className="me-1"/>Inbox
                        </a>
                    </Link>
                    <Link href="#">
                        <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            <FontAwesomeIcon icon={faGear} className="me-1"/>Settings
                        </a>
                    </Link>
                    <hr className="border-dark-500"/>
                    <Link href="#">
                        <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            <FontAwesomeIcon icon={faArrowRightFromBracket} className="me-1"/>Log out
                        </a>
                    </Link>
                </div>
            </div>)}
    </div>);
}



