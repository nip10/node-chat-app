# Chat app
> Simple chat app using SocketIO, live [here](https://p.dcdev.pt/chat)
* The goal of this project was to learn how to use SocketIO and testing using Mocha (now using Jest).



<p align="center">
<img src="http://via.placeholder.com/500x300">
</p>

## Getting Started

### Pre-requisites

* Node
* NPM

### Installing

* Install packages

```
npm install
```

* Build assets

```
npm run build
```

* Edit .env.sample and rename to .env

```
PORT= 3000
```

### Developing

* Run in development mode

```
npm run dev
```

### Production

* Run in production mode

```
npm run prod
```

Note: Static files are not served by Express in production. Instead, its advisable to use Nginx (or an alternative).

### Testing

* Run in test mode

```
npm run test
```

## Built With

* Node (ES6)
* HTML5 + CSS + JS

## Packages used

* Express (server framework)
* SocketIO (sockets for real time chat)
* jQuery
* Mustache (view engine)

## Future improvements

* Remove jQuery
* Remove Express
* List online users in mobile view
* Save chat history for some time

## Contributing

Feel free to submit PR's.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
