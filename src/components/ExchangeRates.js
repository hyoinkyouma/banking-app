import React, { useEffect, useState } from "react";
import FetchRequest from "../utils/fetchRequest";
import financialUtils from "../utils/financialUtils";
import CustomScroller from "react-custom-scroller";

function ExchangeRates() {
  const [currency, setCurrency] = useState("usd");
  const [phpInput, setPhpInput] = useState(0);
  const [targetInput, setTargetInput] = useState(0);
  const [inputsActive, setInputsActive] = useState("notActive");
  const [isWrong, setIsWrong] = useState(false);
  const [rates, setRates] = useState({
    usd: {
      rate: 0,
      currency: "United States dollar",
      code: "usd",
    },
    jpy: {
      rate: 0,
      currency: "Japanese yen",
      code: "jpy",
    },
    cny: {
      rate: 0,
      currency: "Chinese Yuan",
      code: "cny",
    },
    gbp: {
      rate: 0,
      currency: "Pound sterling",
      code: "gbp",
    },
    aud: {
      rate: 0,
      currency: "Australian dollar",
      code: "aud",
    },
    eur: {
      rate: 0,
      currency: "Euro",
      code: "eur",
    },
  });

  const handleCurrencyChange = (newCurrency) => {
    setCurrency(newCurrency);
    setTargetInput(phpInput * rates[newCurrency].rate);
  };

  useEffect(() => {
    fetcher((data) => {
      setRates(data);
    });
    async function fetcher(cb) {
      const fetch = new FetchRequest(
        "https://banking-app-avion.herokuapp.com/exchangeRate"
      );
      fetch.getCurrency((data) => cb(data));
    }
  }, [currency]);
  return (
    <div className="col s12 m6">
      <div className="z-depth-3 hoverable card blue-grey darken-1">
        <div className="card-content white-text">
          <span className="card-title">Peso Exchange Rates</span>

          <div className="row" style={{ marginBottom: "0" }}>
            <div className="input-field col s12 m6 white-text center">
              <input
                id="peso"
                type="text"
                className="validate white-text"
                value={
                  Number(phpInput) === 0 ? "" : Math.round(phpInput * 100) / 100
                }
                onChange={(e) => {
                  if (!Number(e.target.value) && e.target.value !== 0) {
                    setIsWrong(true);
                  } else {
                    setPhpInput(e.target.value);
                    setTargetInput(e.target.value * rates[currency].rate);
                    setIsWrong(false);
                  }
                }}
                onClick={() => {
                  setInputsActive("active");
                }}
              />
              <label htmlFor="peso" className={inputsActive}>
                Philippine Peso (PHP)
              </label>
            </div>
            <div className="input-field col s12 m6 white-text center">
              <input
                id="target"
                type="text"
                className="validate white-text"
                value={
                  targetInput === 0 ? "" : Math.round(targetInput * 100) / 100
                }
                onChange={(e) => {
                  if (!Number(e.target.value) && e.target.value !== 0) {
                    setIsWrong(true);
                  } else {
                    setTargetInput(e.target.value);
                    setPhpInput(e.target.value / rates[currency].rate);
                    setIsWrong(false);
                  }
                }}
                onClick={() => {
                  setInputsActive("active");
                }}
              />

              <label htmlFor="target" className={inputsActive}>
                {financialUtils.titleCase(rates[currency].currency) +
                  " " +
                  `(${rates[currency].code})`.toUpperCase()}
              </label>
            </div>
          </div>
          <p style={{ paddingLeft: "1rem" }}>
            Current Rate:
            {financialUtils.numToFinString.format(
              Math.round((1 / rates[currency].rate) * 100) / 100
            )}
          </p>
          <p className="red-text">{isWrong ? "Please enter a number." : ""}</p>
        </div>

        <CustomScroller>
          <div className="card-action exchange-rate-options">
            <a
              href="#"
              onClick={() => {
                handleCurrencyChange("usd");
              }}
            >
              USD
            </a>
            <a
              href="#"
              onClick={() => {
                handleCurrencyChange("jpy");
              }}
            >
              JPY
            </a>
            <a
              href="#"
              onClick={() => {
                handleCurrencyChange("cny");
              }}
            >
              CNY
            </a>
            <a
              href="#"
              onClick={() => {
                handleCurrencyChange("eth");
              }}
            >
              ETH
            </a>
            <a
              href="#"
              onClick={() => {
                handleCurrencyChange("btc");
              }}
            >
              BTC
            </a>
            <a
              href="#"
              onClick={() => {
                handleCurrencyChange("gbp");
              }}
            >
              GBP
            </a>
            <a
              href="#"
              onClick={() => {
                handleCurrencyChange("aud");
              }}
            >
              AUD
            </a>
            <a
              href="#"
              onClick={() => {
                handleCurrencyChange("eur");
              }}
            >
              EUR
            </a>
          </div>
        </CustomScroller>
      </div>
    </div>
  );
}

export default ExchangeRates;
