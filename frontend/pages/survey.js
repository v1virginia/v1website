import {SwitchTransition} from "react-transition-group";
import {CSSTransition} from "react-transition-group";
import {useEffect, useState} from "react";
import {surveyQuestions} from "../data/surveyQuestions";
import {resourceTrees} from "../data/resourceTrees";

const Survey = () => {
    const [displayMode, setDisplayMode] = useState("question")
    const [currentItem, setCurrentItem] = useState("INTRO")
    const item = surveyQuestions[currentItem] ?? {id: 10}
    const resource = displayMode === "resource" ? currentItem.map(resource => resourceTrees[resource].resources).flat() : null
    const shuffled = resource && resource.sort((a, b) => (a.name > b.name) ? 1 : -1)

    function navigateForward(choice) {
        if (choice.segue === "resource") {
            setDisplayMode("resource")
            setCurrentItem(choice.leadsTo)
        } else {
            setDisplayMode("question")
            setCurrentItem(choice.leadsTo)
        }
    }

    function navigateBackwards() {
        setCurrentItem(item.derivesFrom)
    }

    function resetSurvey() {
        setCurrentItem("1A")
        setDisplayMode("question")
    }

    useEffect(() => {
        setTimeout(() => {
            resetSurvey()
        }, 1000)
    }, [])

    return (
        <div className="max-h-screen">
            <SwitchTransition>
                <CSSTransition
                    key={item.id}
                    addEndListener={(node, done) => node.addEventListener("transitionend", done, false)}
                    classNames='fade'
                >
                    <div className={`h-screen flex ${displayMode === "question" ? "items-center" : "items-start"} px-4`}>
                        {displayMode === "question" ? <div className="w-full mx-auto max-w-7xl text-center">
                            <h1 className="text-2xl md:text-4xl font-bold font-display">
                                {item ? item.question : null}
                            </h1>
                            <div className="md:space-x-4 space-y-4 md:space-y-0 mt-6">
                                {item.choices.map(choice => <button
                                    className="text-lg py-1 px-4 font-medium text-gray-800 md:border border-gray-200 md:shadow-sm rounded-full
                                transition-all duration-200
                                hover:bg-red-50 hover:text-red-600 hover:border-red-200
                                focus:bg-red-50 focus:text-red-600 focus:border-red-200
                                "
                                    key={choice.content} onClick={() => {
                                    navigateForward(choice)
                                }}>
                                    {choice.content}
                                </button>)}
                            </div>
                        </div> : <div className="w-full mx-auto max-w-4xl text-center my-16 md:my-32">
                            <div className="text-left mb-2">
                                <button onClick={resetSurvey} className="uppercase text-red-600 font-bold font-display">&larr; Start Over</button>
                            </div>
                            <h1 className="text-2xl md:text-4xl font-bold mb-6 font-display">Here are the resources we think will be
                                most helpful</h1>
                            <ul className="divide-y divide-gray-200 w-full">
                                {shuffled.map(item => <li className="flex group justify-start items-center">
                                    <img src={item.image}
                                         className="w-12 h-12 rounded-lg object-cover border group-hover:border-red-300 group-focus:border-red-300 shadow-sm mr-4 transition-all duration-150"/>
                                        <a className="block py-4 w-full text-left" href={item.url} target="_blank">
                                            <h2 className="md:text-xl font-semibold text-gray-800 group-hover:text-red-600 group-focus:text-red-600 transition-all duration-150 inline-flex items-center">
                                                {item.name}
                                            </h2>
                                            <p className="text-sm md:text-lg text-gray-600 group-hover:text-red-500 transition-all duration-200">
                                                {item.description ?? "I gave it a cold? I gave it a virus. A computer virus. So you two dig up, dig up dinosaurs?"}
                                            </p>
                                        </a>
                                    </li>
                                )}
                            </ul>
                        </div>}
                    </div>
                </CSSTransition>
            </SwitchTransition>
        </div>
    )
}

export default Survey