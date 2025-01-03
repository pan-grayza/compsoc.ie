const AboutComponent = () => {
    return (
        <>
            <section id="about" className="about">
                <div className="container">
                    <img
                        alt=""
                        src="assets/img/compsoc_banner_blue_black.png"
                        width="30%"
                    ></img>
                    <br></br>
                    <hr></hr>

                    <div className="row">
                        <div className="col-sm">
                            <div className="section-title">
                                <h2>Who we are</h2>
                            </div>
                            <p>
                                CompSoc is University of Galway’s Computer and
                                Networking Society. We host events for
                                everything computing related from how to setup
                                your own blog to System Administration and
                                Programming Tutorials. We also host a number of
                                services on our Society run servers for our
                                members. CompSoc is the oldest computer-related
                                society in Ireland, while many Alumni believe it
                                was much earlier, was formally established in
                                1977 during the days that the University was
                                known as UCG.
                            </p>
                        </div>
                        <div className="col-sm">
                            <div className="section-title">
                                <h2>Our mission</h2>
                            </div>
                            <p>
                                CompSoc’s main goal is to try and foster a love
                                and passion for all things technology related in
                                University of Galway. We host a wide variety of
                                events to work towards this goal, including
                                workshops about Linux, hardware and programming.
                                As outlined under our Constitution, our aims is
                                to “promote and increase awareness of electronic
                                communication and related computer systems, a
                                forum to discuss and gain experience in computer
                                networking and systems and to help educate
                                people in the usage of Internet utilities and
                                resources”.
                            </p>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm">
                            <div className="section-title">
                                <h2>Our constitution</h2>
                            </div>
                            <p>
                                You can find our constitution{' '}
                                <b>
                                    <a href="constitution">here</a>
                                </b>
                                , as ratified by the USCG (
                                <i>"University Societies Coordination Group"</i>
                                ) on 27th May, 2022.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AboutComponent
