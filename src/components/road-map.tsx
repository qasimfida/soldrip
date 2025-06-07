import { Container } from './container';
import Title from './title';
import RoadMapBg from '@/assets/road-map.jpg';
import Backdrop from '@/assets/back-drop.png';
import { ROAD_MAP } from '@/constants/road-map';
import type { RoadmapItem } from '@/types/road-map';


export const RoadMap = () => {
    return (
        <section
            id="roadmap"
            className="pt-26 -mt-26">

            <div
                className="bg-center bg-cover no-repeat pt-11 pb-13 md:pt-20 gradient primary / 50" style={{
                    backgroundImage: `url(${RoadMapBg})`,
                    backgroundBlendMode: "overlay",
                }}>
                <Container>
                    <Title
                        className="mb-16 text-white"
                    >
                        Road Map
                    </Title>

                    <div className="relative py-3 ml-6 lg:ml-0">
                        {/* LINE */}
                        <div className="block w-[3px] top-0 h-full lg:transform lg:-translate-x-1/2 rounded-full absolute lg:left-1/2 bg-secondary" />
                        <div className="absolute w-6 lg:w-[84px] h-[3px] bg-[#48EDC6] top-0 left-0 lg:left-1/2 transform rounded-md   -translate-x-1/2" />
                        <div className="absolute w-6 lg:w-[84px] h-[3px] bg-[#48EDC6] bottom-0 left-0 lg:left-1/2 transform rounded-md   -translate-x-1/2" />

                        <div className="flex flex-col gap-12 lg:gap-0">
                            {ROAD_MAP.map((item: RoadmapItem, index: number) => (
                                <div key={index} className="relative">
                                    <div className="z-10 absolute top-1/2 left-0 lg:left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary border-[3px] lg:border-[6px] border-[#48EDC6] w-7 h-7 lg:w-14 lg:h-14 border-box  shadow-secondary ">
                                    </div>
                                    <div className={`absolute w-11 lg:w-[100px] h-[3px] bg-[#48EDC6] top-1/2 left-3 lg:left-1/2 transform  -translate-y-1/2  ${index % 2 === 0 ? "lg:-translate-x-[calc(50%+50px)]" : "lg:-translate-x-[calc(50%-75px)]"}`} />

                                    <div className={`  flex flex-col ml-13 lg:flex-row ${index % 2 === 0 ? 'lg:flex-row-reverse lg:mr-[245px]' : 'lg:ml-[245px]'}`}>
                                        <div className="hidden w-0 lg:w-1/2 lg:block " />
                                        <div
                                            className={`relative overflow-hidden flex w-full lg:w-1/2  ${index % 2 === 0 ? `lg:justify-end` : `lg:justify-start`}`}
                                        >
                                            <div className={`relative w-full lg:w-auto `}>
                                                <img src={Backdrop} alt="backdrop" className='absolute top-0 left-0 w-full h-full ' />

                                                <div className={`relative  px-7 md:px-8 py-6 w-auto max-w-full   ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'}  `}

                                                >

                                                    <div className="flex items-center mb-3 ">
                                                        <Title type="heading" className="text-gradient-secondary-linear" >Phase {index + 1}</Title>

                                                    </div>
                                                    <div className="flex">
                                                        {item.left && <div className={`h-full w-full  ${item.left && item.right ? "md:max-w-1/2" : "w-full"}`}>
                                                            <div className="flex flex-col justify-between h-full space-y-4 text-white">
                                                                {item.left?.map((item, index) => (
                                                                    <p key={index} className={`text-sm mb-0 ${index > 0 ? 'mt-3' : ""}`}>
                                                                        {item}
                                                                    </p>
                                                                ))}
                                                            </div>
                                                        </div>}
                                                        {item.left && item.right && <div className="block w-px bg-[#4FD1C5] mx-4"></div>}
                                                        {item.right && <div className={`h-full w-full  ${item.left && item.right ? "md:max-w-1/2" : "w-full"}`}>
                                                            <div className="flex flex-col justify-between h-full space-y-4 text-white">
                                                                {item.right?.map((item, index) => (
                                                                    <p key={index} className={`text-sm mb-0 ${index > 0 ? 'mt-3' : ""}`}>
                                                                        {item}
                                                                    </p>
                                                                ))}
                                                            </div>
                                                        </div>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </div>
        </section >
    );
}

export default RoadMap;