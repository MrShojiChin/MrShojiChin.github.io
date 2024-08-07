/*
More icons at https://react-icons.github.io/react-icons/
*/

import { Container, Button, Table } from "react-bootstrap";
import { CiShoppingCart } from "react-icons/ci";
import { MdClear } from "react-icons/md";
import { BsFillTrashFill } from "react-icons/bs";

import style from "./mystyle.module.css";

function QuotationTable({ data, clearDataItems, deleteByIndex }) {

  // Guard condition
  if (!data || data.length === 0) {
    return (
      <Container>
        <h1>Quotation</h1>
        <p><CiShoppingCart /> No items</p>
      </Container>
    );
  }

  //const total = data.reduce((acc, v) => acc + (v.qty * v.ppu)-v.discount, 0);
  const totalDiscount = data.reduce((acc, v) => acc + (parseFloat(v.discount) || 0), 0);
  const totalAmount = data.reduce((acc, v) => acc + v.qty * v.ppu - (parseFloat(v.discount) || 0), 0); // Calculate total amount after discount

  const clearTable = () => {
    clearDataItems();
  };

  const handleDelete = (index) => {a
    deleteByIndex(index)
  }

  return (
    <Container>
      <h1>Quotation</h1>
      <Button onClick={clearTable} variant="outline-dark">
        <MdClear /> Clear
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className={style.textCenter}>-</th>
            <th className={style.textCenter}>Qty</th>
            <th className={style.textCenter}>Item</th>
            <th className={style.textCenter}>Price/Unit</th>
            <th className={style.textCenter}>Discount</th>
            <th className={style.textCenter}>Amount</th>
          </tr>
        </thead>
        <tbody>{
          data.map((v, i) => {
            let amount = (v.qty * v.ppu) - v.discount;
            return (
              <tr key={i}>
                <td className={style.textCenter}><BsFillTrashFill onClick={() => handleDelete(i)} /></td>
                <td className={style.textCenter}>{v.qty}</td>
                <td>{v.item}</td>
                <td className={style.textCenter}>{v.ppu}</td>
                <td className={style.textCenter}>{v.discount}</td>
                <td className={style.textRight}>{amount}</td>
              </tr>
            );
          })
        }</tbody>
        <tfoot>
          <tr>
            <td colSpan={4} className={style.textRight}>
              Total 
            </td>
            <td className={style.textRight}>{totalDiscount}</td>
            <td className={style.textRight}>{totalAmount}</td>
          </tr>
        </tfoot>
      </Table>
    </Container>
  );
}

export default QuotationTable;
