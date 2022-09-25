# Droid Radar

## Installing & Running

Just `yarn` to install all dependencies and then `yarn dev` to run the application. The port is hardcoded to `8888` because the tests file required it.

The tests can be run with the `yarn test` command.

## Wrong Expected Results

I believe some tests are expecting the wrong results. I changed the expected results locally and all the tests passed.

- **Test 10** protocol is `"furthest-enemies"` and expects the `{"x":30,"y":95}` as result, but the `{"x":70,"y":91}` point is further.

```
> EXPECTED: {"x":30,"y":95}
> OUTPUT:   {"x":70,"y":91}
```

| Point | Distance from `(0,0)` |
| --- | --- |
| `{ x: 30, y: 95 }` | `99.62429422585637` |
| `{ x: 70, y: 91 }` | `114.80853626799707` |

- **Test 11** protocols are `"furthest-enemies"` and `"avoid-mech"` and expects the `{"x":91,"y":30}` as result, but the `{"x":70,"y":91}` point has `"soldier"` type (non-`mech`) and is further.

```
> EXPECTED: {"x":91,"y":30}
> OUTPUT:   {"x":70,"y":91}
```

| Point | Distance from `(0,0)` |
| --- | --- |
| `{ x: 91, y: 30 }` | `95.81753492967766` |
| `{ x: 70, y: 91 }` | `114.80853626799707` |

## How Long It Took You To Do The Test?

About 4 hours.

## Selection Process Rate

Very nice conversation time with Ángel.
