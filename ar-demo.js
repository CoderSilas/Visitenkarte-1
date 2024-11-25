window.onload = async function()
{
    try {
            const session = await startARSession(); 

            function animate(time, frame)
            {
                session.requestAnimationFrame(animate);
            }
    
            session.requestAnimationFrame(animate);
        }
        catch(error) {
            alert(error.message);
        }

    };

    async function startARSession()
    {
        if(!AR.isSupported()) {
            throw new Error(
                'This device is not compatible with this AR experience.\n\n' +
                'User agent: ' + navigator.userAgent
            );
        }
    
        const tracker = AR.Tracker.ImageTracker();
        await tracker.database.add([{
            name: 'Test1',
            image: document.getElementById('Test1')
        }, {
            name: 'Test2',
            image: document.getElementById('Test2')
        }, {
            name: 'Test3',
            image: document.getElementById('Test3')
        }, {
            name: 'Test4',
            image: document.getElementById('Test4')
        }, {
            name: 'Test5',
            image: document.getElementById('Test5')
        }]);
    



        const viewport = AR.Viewport({
            container: document.getElementById('ar-viewport')
        });
    
        //const video = document.getElementById('my-video'); // comment this line
        //const source = AR.Source.Video(video); // comment this line
        const source = AR.Source.Camera();
    
        const session = await AR.startSession({
            mode: 'immersive',
            viewport: viewport,
            trackers: [ tracker ],
            sources: [ source ],
            stats: true,
            gizmos: true,
        });
    
        return session;
    }