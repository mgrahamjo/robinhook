# Robinhook

Robinhook will automatically invest any available funds in your [Robinhood](robinhood.com) account based on simple configurable rules. Works great in conjunction with automatic transfers.

## Install

`git clone https://github.com/mgrahamjo/robinhook`

## Configure

Edit `config.json` to use your account number, which can be found on the account page in the Robinhood app. List the stocks you want to purchase, and optionally the percentage of available funds you want to allocate for each stock. Robinhook will evenly distribute available funds between any stocks which do not have a custom allocation.

```
{
    "account": "XXXXXXXX",
    "stocks": [
        {
            "symbol": "MSFT",
            "allocation": 50
        },
        {
            "symbol": "AMZN"
        },
        {
            "symbol": "GOOG"
        }
    ]
}
```

In this configuration, MSFT will get 50% of available funds, while AMZN and GOOG will each get 25%.

## Run

From the `robinhook` project, run `node .`. You will be prompted for your Robinhood username and password. These credentials are not stored anywhere.
