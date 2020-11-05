import {SwitchTransition} from "react-transition-group";
import {CSSTransition} from "react-transition-group";
import {useEffect, useState} from "react";
import {surveyQuestions} from "../data/surveyQuestions";
import {resourceTrees} from "../data/resourceTrees";
import _ from 'lodash';

const SurveyWindow = () => {
    const [displayMode, setDisplayMode] = useState("question")
    const [currentItem, setCurrentItem] = useState("INTRO")
    const item = surveyQuestions[currentItem] ?? {id: 10}
    const resource = displayMode === "resource" ? currentItem.map(resource => resourceTrees[resource].resources).flat() : null
    const shuffled = resource && _.shuffle(resource)

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
        <SwitchTransition>
            <CSSTransition
                key={item.id}
                addEndListener={(node, done) => node.addEventListener("transitionend", done, false)}
                classNames='fade'
            >
                <div className={`h-screen flex ${displayMode === "question" ? "items-center" : "items-start"} px-6`}>
                    {displayMode === "question" ? <div className="w-full mx-auto max-w-7xl text-center">
                        <p className="text-4xl font-bold font-display">
                            {item ? item.question : null}
                        </p>
                        <div className="space-x-4 mt-4">
                            {item.choices.map(choice => <button
                                className="text-lg py-1 px-4 border border-gray-200 shadow-sm rounded-full
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
                    </div> : <div className="w-full mx-auto max-w-4xl text-center my-24">
                        <div className="text-left">
                            <button onClick={resetSurvey} className="uppercase text-red-600 font-bold font-display">&larr; Start Over</button>
                        </div>
                        <h1 className="text-4xl font-bold mb-6 font-display">Here are the resources we think will be
                            most helpful</h1>
                        <ul className="divide-y w-full">
                            {shuffled.map(item => <li>
                                <a className="group block py-4 w-full text-left" href={item.url}>
                                    <h2 className="text-xl font-semibold text-gray-800 group-hover:text-red-600 group-focus:text-red-600 transition-all duration-200">
                                        {item.name} <span className="opacity-0 group-hover:opacity-100 group-focus:opacity-100">&rarr;</span>
                                    </h2>
                                    <p className="text-lg text-gray-600 group-hover:text-red-500 transition-all duration-200">
                                        {item.description ?? "I gave it a cold? I gave it a virus. A computer virus. So you two dig up, dig up dinosaurs?"}
                                    </p>
                                </a>
                                </li>
                            )}
                        </ul>
                    </div>}
                </div>
            </CSSTransition>
        </SwitchTransition>)
}

export default SurveyWindow