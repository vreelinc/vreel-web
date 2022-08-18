fetch(process.env.NEXT_PUBLIC_SERVER_BASE_URL, {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({
    /*  query: `
    succeeded
    message
    `, */
    variables: {
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNhbjI1Z2kyM2FramNpZXRuaGQwIiwiYWNjb3VudF90eXBlIjoia2QiLCJleHAiOjE2NjAyMDQwMzh9.I7fAYlsQJ2rGpOYa3RIZd7mgbgyDm-_pGub3q-_rfmw",
      slideId: "can25gi23akjcietnhdg",
      location: 4,
    },
  }),
})
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    resolve(data);
  })
  .catch((err) => {
    console.error(err);
    reject(err);
  });
