self.addEventListener('push', function(event) {

    let data = { title: 'Notification', body: '' };

    if (event.data) {
        try {
            data = event.data.json();
        } catch (e) {console.log('Push data is not string.');
            data = {
                title: 'Notification',
                body: event.data.text()
            };
        }
    }

    const options = {
        body: data.body || 'No context',
        icon: '/icon.png',
        badge: '/badge.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();

    event.waitUntil(
        clients.matchAll({ type: 'window' }).then(function(clientList) {
            for (var i = 0; i < clientList.length; i++) {
                var client = clientList[i];
                if (client.url === '/' && 'focus' in client)
                    return client.focus();
            }
            if (clients.openWindow) {
                return clients.openWindow('/');
            }
        })
    );
});