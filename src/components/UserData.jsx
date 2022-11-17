import React, {useState} from "react";
import * as ReactDOM from 'react-dom';
import Modal from "./Modal";

function UserData({persons}) {
    const [modalData, setModalData] = useState(null);

    if (!persons || persons.length === 0) return <p>Нет данных.</p>

    return (
        <>
            {modalData && ReactDOM.createPortal(<Modal {...modalData} handleClose={() => setModalData(null)} />, document.body)}
            <div>
                <table>
                    <thead>
                    <tr>
                        <th scope="col"><p>Инструмент</p></th>
                        <th scope="col"><p>4H</p></th>
                        <th scope="col"><p>1W</p></th>
                        <th scope="col" colSpan="2"><p>Поддержка</p></th>
                        <th scope="col"><p>Цена</p></th>
                        <th scope="col" colSpan="2"><p>Сопротивление</p></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        persons.map((person, key) =>
                            <tr key={key}>
                                <td className="codeTS">
                                    <p onClick={() => setModalData({
                                        token: person.codeTS
                                    })}>{person.codeTS}</p>
                                </td>
                                <td className="button">
                                    <button></button>
                                </td>
                                <td className="button">
                                    <button></button>
                                </td>
                                <td><p>{person.supp}</p></td>
                                <td><p>{person.suppprc}%</p></td>
                                <td><p>{person.price}</p></td>
                                <td><p>{person.resisprc}%</p></td>
                                <td><p>{person.resis}</p></td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>

            </div>
        </>
    )
}

export default UserData;