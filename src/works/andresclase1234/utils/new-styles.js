import { css } from 'lit-element';

export const holidaysStyle = css`
  table {
    border: 1px solid #e4e4e4;
    border-collapse: collapse;
    padding: 10px;
    margin-left: 1%;
    margin-right: 1%;
    width: 98%;
    font-family: Roboto, 'Open Sans';
  }
  tr:first-of-type {
    border: 1px solid #ccd0d4;
  }
  tr:nth-child(even) {
    background-color: #f6f6f6;
  }
  th {
    text-align: left;
  }
  td {
    font-weight: 500;
    font-size: 13px;
    text-size-adjust: 100%;
    line-height: 19.5px;
    color: rgb(85, 85, 85);
  }
  .Tableheader {
    font-family: Roboto, 'Open Sans';
    font-size: 14px;
    color: rgb(10, 2, 2);
    font-weight: 400px;
    line-height: 35px;
    text-size-adjust: 100%;
    text-align: left;
  }
  .header {
    color: rgb(10, 2, 2);
    font-size: 14px;
    font-weight: 400px;
  }
  .order {
    height: 100%;
    line-height: 35px;
    font-family: Roboto, 'Open Sans';
    font-size: 14px;
    width: 100%;
    padding: 0;
    background-color: transparent;
    border: none;
    cursor: pointer;
    text-align: left;
  }
  .stepper {
    margin: 10px 0;
    width: 90%;
    margin-left: 5%;
    margin-right: 5%;
  }
  .stepper .step:hover {
    background-color: #f1f1f1;
  }
  .step {
    display: inline-block;
    padding: 5px;
    border: 1px solid #d8d7d7;
    width: 20px;
    height: auto;
    text-align: center;
    cursor: pointer;
  }
  .step.active {
    background-color: #535353 !important;
    color: white;
  }
  .step.left {
    transform: rotate(180deg);
  }
  .stepper,
  .step {
    user-select: none;
  }
`;
