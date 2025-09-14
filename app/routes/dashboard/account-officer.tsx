import { type FC } from 'react';
import { FaEnvelope } from 'react-icons/fa6';
import { LuPhone } from 'react-icons/lu';
import Button from '~/components/ui/button';



const AccountOfficer: FC = () => {
	return (
		<div className="w-full relative bg-[#FEFEFE] dark:bg-neutral-800 h-[calc(100vh_-_140px)] text-left text-[19.9px] text-gray-200 flex justify-center items-center">
			{/* <div className="w-6 h-6" /> */}
			<div className="rounded-xl bg-white dark:bg-neutral-800 flex flex-col gap-4">
				<div className="border-[#F3F4F6] dark:border-neutral-700 border-solid border-b-[1px] box-border flex flex-col gap-3 py-4">
					<b className="text-black dark:text-neutral-200 leading-7 inline-block w-[720px] h-7">Your Account Officer</b>
					<div className="flex gap-4 text-[17.67px] items-center">
						<img className="rounded-full w-20 h-20 object-cover" alt="" src="Container+BackgroundColor.png" />
						<div className="flex flex-col gap-2">
							<b className="text-black dark:text-neutral-200 leading-7 inline-block w-[264px] h-7">Mercy Omunmuwim</b>
							<div className="text-[16.1px] leading-[24px] text-gray-500 inline-block w-[264px] h-6">Ilorin, Umaru Audi Road</div>
						</div>
					</div>
				</div>
				<div className="border-[#F3F4F6] dark:border-neutral-700 border-solid border-b-[1px] py-4 box-border flex flex-col gap-3 text-[15.7px]">
					<b className="text-black dark:text-neutral-200 leading-[24px] inline-block w-[720px] h-6">Contact Information</b>
					<div className="w-[720px] h-[124px] text-center text-[14px] flex gap-2">
						<div className="rounded-lg flex flex-col gap=2 items-center justify-center bg-[#F3F4F6] dark:bg-neutral-700 w-[352px] h-[124px]">
							<div className="p-3 flex-items-center justify-center rounded-full bg-white dark:bg-neutral-800">
								<LuPhone size={24} className="text-primary" />
							</div>

							<div className="top-[72px] left-[120.5px] w-[111px] h-9">
								<b className="text-black dark:text-neutral-200 leading-[20px] inline-block h-5">070 8156 8867</b>
								<div className="top-[20px] left-[0px] text-[12.37px] leading-[16px] text-gray-500 inline-block w-[111px] h-4">Tap to call directly</div>
							</div>
						</div>
						<div className="rounded-lg flex flex-col gap=2 items-center justify-center bg-[#F3F4F6] dark:bg-neutral-700 w-[352px] h-[124px] text-[13.75px]">
							<div className="p-3 flex-items-center justify-center rounded-full bg-white dark:bg-neutral-800">
								<FaEnvelope size={24} className="text-primary" />
							</div>
							<div className="top-[72px] left-[64px] w-56 h-9">
								<b className="text-black dark:text-neutral-200 leading-[20px] inline-block h-5">contactcentre@frontlettservice.com</b>
								<div className="top-[20px] left-[0px] text-[12.35px] leading-[16px] text-gray-500 inline-block w-56 h-4">Response within 24 hours</div>
							</div>
						</div>
					</div>
				</div>
				<div className="w-full grid grid-cols-2 text-center text-[15.9px] text-white gap-2">
					<Button>Rate Account Officer</Button>
					<Button variant="outline">Change Account Officer</Button>
				</div>
			</div>
		</div>);
};

export default AccountOfficer;
