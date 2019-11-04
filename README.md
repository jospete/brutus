# Brutus Brute-Force Combination Runner

This is a simple brute-force implementation that iterates over all possible combinations of a given set of elements, looking for a target combination.

Made as a fun little side-project to better understand combinatoric logic and tail-recursion.

Run like so:

```
# uses the entire valid password character set by default (see Brutal namespace constants)
npm start -- --target "password"
```

```
# or specify a custom character set
npm start -- --char-set "password" --target "password"
```

```
# or specify "numeric" for the built-in set "0123456789"
npm start -- --numeric --target "12345"
```

```
npm run combos -- --char-set ABC --output-size 2
```

```
# outputs values 0000-9999
npm run combos -- --char-set 0123456789 --output-size 4
```