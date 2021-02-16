import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";

import { Body, Button, Header, Image, IconImage, Link, InternalLink } from "../components";

function Home({chainInfos, combined}) {
    const r = combined.map(c => {
      return chainInfos.map((chain, i) => {
        if(c.data[i].symbol !== 'DAI'){
          return({
            network:chain.name,
            symbol:c.data[i].symbol,
            address:c.data[i].id
          })
        }
      })
    })
    return (
      <Body>
      <h1>🐰Off L1</h1>
      <div>Swap between Uniswap clones across chains</div>
      {(combined?.length > 0) ? (
          <table>
          <tr>
            <th>Coin</th>
            {chainInfos.map(c => {
              return(<th><IconImage src={c.exchangeIcon} /> on {c.name}</th>)
            })}
          </tr>
          {combined.map(c => (
              <tr>
              <td>
                <InternalLink
                  to={`/token/${c.symbol}`}
                >{c.symbol}</InternalLink>                
              </td>
              {chainInfos.map((_, i) => {
                return(
                  <td>
                    <ul>
                      <li>
                        {c.data[i].symbol}
                      </li>
                      <li>
                        {c.data[i].id}
                      </li>

                      <li>
                        ${(c.data[i].derivedETH * chainInfos[i].unitPrice).toFixed(2)}
                      </li>
                    </ul>
                  </td>
                )
              })}
              </tr>
          ))}
          </table>
      ) : ('Loading...')}
      </Body>
    )
  }
  export default Home;