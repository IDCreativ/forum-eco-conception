import React from 'react';

const Replays = (
    events,
    categories
) => {
    return (
        <section className="replays">
            <div id="replays-container" className="container">
                {events.map((event, index) => {
                    {event.hasReplays && (
                        <div className="row">
                            <div className="col h2-wrapper">
                                <h2>
                                    {event.name}
                                </h2>
                                <div className="after-h2"></div>
                            </div>
                        </div>
                        )
                        {categories.map((category, index) => {
                            {category.hasReplaysInThatEvent(event) && (
                                <div className="row">
                                    <div className="col">
                                        <h3>
                                            {category.name}
                                        </h3>
                                    </div>
                                </div>
                            )}
                            <div className="row replay-category">
                                {category.videos.map((video, index) => {
                                    {video.status === false && video.type !== 1 && video.event.id === event.id (
                                        <div className="video-replay col-md-4 mb-4">
                                            <div className="embed-responsive embed-responsive-16by9">
                                                {video.embedCode}
                                            </div>
                                        </div>
                                    )}
                                })}
                            </div>
                        })}
                    }
                })}
            </div>
        </section>
    );
}

export default Replays;