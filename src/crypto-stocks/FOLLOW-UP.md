# Implementation:

### Q) What libraries did you add to the frontend? What are they used for?

- Vite + React for fast development environment. Also, I have familiarity with React and not with other frameworks (Vue, Angular).
- Axios for HTTP requests with MoonPay API.
- Material UI for pre-styled components.

### Q) What's the command to start the frontend application locally?

```sh
npm run dev
```

### Q) What libraries did you add to the backend? What are they used for?

- Express for the HTTP requests handling.
- Celebrate for input validation on the endpoints.
- Morgan for time measuring on the endpoints.
- Axios for HTTP requests with Binance and Coinbase APIs.

### Q) What's the command to start the backend application locally?

Same as the frontend app:
```sh
npm run dev
```

### Q) Any other comments we should read before evaluating your solution?

No.

---

# General:

### Q) If you had more time, what further improvements or new features would you add?

- Frontend
  - More pleasing UI.
  - Better organize frontend code for smaller and more readable components.
- Backend
  - Add more exchanges.
  - Some kind of debouncer to prevent API abuse.

### Q) Which parts are you most proud of? And why?

I felt quite comfortable using pre-existent frontend components library like Material UI, it made my frontend work way faster than I was expecting.

Also the Celebrate and Supertest libs gave me a good amount of security about the endpoint creation on the backend.

### Q) Which parts did you spend the most time with? What did you find most difficult?

Spend a good amount of time reading docs about the Material UI components on how to use them the proper way.

The most difficulty was not related to tech, but to understanding how the Order Book mechanism works (I still don't know if I got it completely).

### Q) How did you find the test overall? Did you have any issues or have difficulties completing? If you have any suggestions on how we can improve the test, we'd love to hear them.

It was a good creativity exercise. Was nice to see the results of both front and backend :)

I thought the two apps would have to communicate somehow, maybe it can happen on a future iteration of this test.
