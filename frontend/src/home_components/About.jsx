import React from "react";
import "./About.css";

const About = () => {
    return (
        <section className="about container section" id="about">
            <h1>About Us</h1>
            <p className="description">
                For any indecisive couple, friend group, or foodie, the notion of not being able to pick a place to eat is a nuisance that is all too familiar. For many, it’s a fruitless debate that takes up both time and patience and is often the make-or-break for a great night. To address this dilemma, Dinder is a collaborative platform designed to enable both RPI students and people nationwide to gain better insight and clarity in food and dining selection. Cleverly drawing inspiration from the popular match-making app, Tinder, this application invites groups of friends, boyfriends and girlfriends, and solo venturers to explore popular and preferred locations based on a number of personalized factors. It offers a comprehensive solution to indecisiveness and provides a fun, interactive experience to ensure that everyone has an efficient tool to make dining and catering matchmaking decisions. Ultimately, no one should be stuck with the question, “Where do you want to eat?”. Swipe. Match. Eat. It's that simple.
            </p>
            <span>{<br/>}</span>
            <h2>Meet the Team:</h2>
            <p className="team">
                Sagar Sahu{<br/>}Paul Kratsios{<br/>}Brendan Capuzzo{<br/>}Ryan Hong{<br/>}Russell Chao
            </p>
        </section>
    );
};

export default About;