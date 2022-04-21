import Head from "next/head";
import Navbar from "../components/Navbar";

const team = [{
    name: "Max Nardi",
    role: "Frontend/Backend Developer",
    image: "/bears/nathan_bear.svg",
    linkedIn: "www.linkedin.com/in/nthnluu",
    github: "https://github.com/nthnluu",
    website: "https://nthnluu.com"
}, {
    name: "Alex ",
    role: "Frontend Designer/Developer",
    image: "https://ventureatbrown.com/bears/smiling_red_bear.svg",
    linkedIn: "https://www.linkedin.com/in/jasper-chen-1b8b98197",
    github: "https://github.com/Jasch3n",
    website: "https://jasch3n.github.io/mySite"
}, {
    name: "Jason He",
    role: "Frontend Developer",
    image: "https://ventureatbrown.com/bears/experienced_pink.svg",
    linkedIn: "https://www.linkedin.com/in/abigail-powell-75705b173",
    github: "https://github.com/abigail-powell",
    website: "https://nthnluu.com"
}, {
    name: "David Xiang",
    role: "Project Manager",
    image: "https://ventureatbrown.com/bears/experienced_green.svg",
    linkedIn: "https://linkedin.com/in/aaronjwang",
    github: "https://github.com/aaronwangj",
    website: "https://aaronjwang.com"
}]

const About = () => {
    const buttonStyle = "text-gray-400 hover:text-gray-300 focus:text-gray-200 transition-all duration-200"
    return <>
        <Head>
            <title>About | V1@Virginia</title>
        </Head>
        <div className="max-w-3xl mx-auto px-4 my-24">
            <Navbar/>
            <h1 className="text-5xl font-bold text-gray-900 font-display">About</h1>
            <section>
                <p className="text-xl text-gray-400 my-4">
                    V1 is the community for ambitious student builders at the University of Virginia. At our core, we support students who are working on side-projects and startups — those who are looking to build their V1: the first version of their product and onwards.
                </p>
                <a className="red-link text-xl" href="https://www.brownentrepreneurship.com/">Learn more about Brown EP &rarr;</a>
            </section>
            <section className="mt-16">
                <h2 className="font-display text-2xl font-semibold mb-4 text-gray-800">Our Team</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {team.map((person, index) => <div className="font-medium leading-tight" key={index}>
                        <img className="h-56 w-full object-cover rounded-lg shadow-sm"
                               alt=""
                               src={person.image}/>
                        <h3 className="text-xl font-semibold text-gray-700 mt-4">{person.name}</h3>
                        <h4 className="text-lg text-gray-400">{person.role}</h4>
                        <div className="flex justify-start items-center space-x-4 mt-2 text-xl">
                            <a className={buttonStyle} href={person.linkedIn} target="_blank">
                                <i className="fab fa-linkedin"/>
                            </a>

                            <a className={buttonStyle} href={person.github} target="_blank">
                                <i className="fab fa-github"/>
                            </a>

                            <a className={buttonStyle} href={person.website} target="_blank">
                                <i className="fas fa-globe-americas"/>
                            </a>
                        </div>
                    </div>)}

                </div>
            </section>
            <div className="font-display text-gray-400 my-3">Graphics and illustrations by <a className="red-link" href="https://www.janicekhang.com/">Janice Khang</a></div>
        </div>
    </>
}

export default About
