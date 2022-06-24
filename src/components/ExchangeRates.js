import React, { useEffect, useState } from "react";
import FetchRequest from "../utils/fetchRequest";
import financialUtils from "../utils/financialUtils";

function ExchangeRates() {
  const [currency, setCurrency] = useState("usd");
  const [phpInput, setPhpInput] = useState(0);
  const [targetInput, setTargetInput] = useState(0);
  const [inputsActive, setInputsActive] = useState("notActive");
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
    console.log(rates);
    console.log(currency);
    fetcher((data) => {
      setRates(data);
    });
    async function fetcher(cb) {
      const fetch = new FetchRequest("http://localhost:3001/exchangeRate");
      fetch.getCurrency((data) => cb(data));
    }
  }, [currency]);
  return (
    <div className="row">
      <div className="col s12 m6">
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title">Peso Exchange Rates</span>
            <div style={{ display: "flex", width: "100%", gap: "5rem" }}>
              <div className="input-field white-text center">
                <input
                  id="php"
                  type="number"
                  className="validate white-text"
                  value={
                    Number(phpInput) === 0
                      ? ""
                      : Math.round(phpInput * 100) / 100
                  }
                  onChange={(e) => {
                    setPhpInput(e.target.value);
                    setTargetInput(e.target.value * rates[currency].rate);
                  }}
                  onClick={() => {
                    setInputsActive("active");
                  }}
                />
                <label htmlFor="php" className={inputsActive}>
                  Philippine Peso (PHP)
                </label>
              </div>
              <div className="input-field">
                <input
                  id="target"
                  type="number"
                  className="validate white-text"
                  value={
                    targetInput === 0 ? "" : Math.round(targetInput * 100) / 100
                  }
                  onChange={(e) => {
                    setTargetInput(e.target.value);
                    setPhpInput(e.target.value / rates[currency].rate);
                  }}
                  onClick={() => {
                    setInputsActive("active");
                    console.log(inputsActive);
                  }}
                />
                <label htmlFor="target" className={inputsActive}>
                  {financialUtils.titleCase(rates[currency].currency) +
                    " " +
                    `(${rates[currency].code})`.toUpperCase()}
                </label>
              </div>
            </div>
          </div>

          <div className="card-action">
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
        </div>
      </div>
    </div>
  );
}

export default ExchangeRates;
