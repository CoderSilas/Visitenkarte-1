window.onload = async function()
{
    try {
        AR.Settings.powerPreference = 'high-performance';
        const session = await startARSession();
        
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

    const tracker = AR.Tracker.Image();
    await tracker.database.add([{
        name: 'Test2',
        image: document.getElementById('Test2')
    }]);

    const viewport = AR.Viewport({
        container: document.getElementById('ar-viewport'),
        hudcontainer: document.getElementById('scan')
    });



    const webcam = AR.Source.Camera({
        resolution: 'md+',
        constraints: {
            facingMode: 'environment' // will prefer the rear camera on mobile devices
            //facingMode: 'user' // will prefer the front camera on mobile devices
        }
    });

    const session = await AR.startSession({
        mode: 'immersive',
        viewport: viewport,
        trackers: [ tracker ],
        sources: [ webcam ],
        stats: true,
        gizmos: true,
    });



    const scan = document.getElementById('scan');

    tracker.addEventListener('targetfound', event => {
        scan.hidden = true;
       // session.gizmos.visible = false;
    });

    tracker.addEventListener('targetlost', event => {
        scan.hidden = false;
      //  session.gizmos.visible = true;
    });

    return session;
}

/*

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
        

        
        const tracker = AR.Tracker.ImageTracker({
            resolution: "lg"
        });
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
            container: document.getElementById('ar-viewport'),
            resolution: 'lg',
            hudContainer: document.getElementById('ar-hud')
        });
    
        //const video = document.getElementById('my-video'); // comment this line
        //const source = AR.Source.Video(video); // comment this line
        const webcam = AR.Source.Camera({
            resolution: 'lg',
        });
    
        const session = await AR.startSession({
            mode: 'immersive',
            viewport: viewport,
            trackers: [ tracker ],
            sources: [ webcam ],
            stats: true,
            gizmos: true,
        });
    
        //scanner image to be not always there
        const scan = document.getElementById('scan');

        tracker.addEventListener('targetfound', event => {
            scan.hidden = true;

        });

        tracker.addEventListener('targetlost', event => {
            scan.hidden = false;
            
        })

        return session;
    }


    */