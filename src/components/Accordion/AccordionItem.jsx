import React, { useEffect, useRef, useState } from "react";

const AccordionItem = ({ title, children }) => {
	const [isOpen, setIsOpen] = useState(false);
	const accordionRef = useRef(null);

	const toggleAccordion = () => {
		setIsOpen(!isOpen);
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				accordionRef.current &&
				!accordionRef.current.contains(event.target)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div className="md:block hidden" ref={accordionRef}>
			<button
				onClick={toggleAccordion}
				className="w-full  flex justify-between items-center focus:outline-none">
				<span className="lg:text-md text-[16px] font-semibold">{title}</span>
				<span>{isOpen ? "" : ""}</span>
			</button>
			{isOpen && (
				<div
					className="px-4 absolute bg-[#3CAC38] rounded-md py-2 mt-4 "
					style={{
						boxShadow:
							"rgba(0, 0, 0, 0.2) -2px 2px 2px 0px, rgba(0, 0, 0, 0.14) -2px 0px 2px 1px, rgba(0, 0, 0, 0.12) -1px 3px 5px 1px",
					}}>
					{children}
				</div>
			)}
		</div>
	);
};

export default AccordionItem;
