import React,{useState,useEffect} from 'react';
import {useHistory,Redirect} from 'react-router-dom';
import {Link} from 'react-router-dom';
import axios from 'axios';
import "../../../App.css";
//boostrap react
import 'bootstrap/dist/css/bootstrap.min.css';

//import css

//import component react-bootstrap
import {Card} from "react-bootstrap";
import {ListGroup} from "react-bootstrap"; 
import {Form} from "react-bootstrap"

function T_pasien() {
    const [nama,setNama] = useState('');
    const [alamat,setAlamat] = useState('');
    const [no_telp,setNo_telp] = useState();
    const [jenis_kelamin,setJenis_kelamin] = useState('');
    const [tanggal_daftar,setTanggal_daftar] = useState('');
    const [Golongan_darah,setGolongan_darah] = useState('');
    const [kode_penyakit,setKode_penyakit] = useState('');
    const [kode_kamar,setKode_kamar] = useState('');
    const [kode_biaya,setKode_biaya] = useState('');
    const [penyakit,setPenyakit] = useState([]);
    const [kamar,setKamar] = useState([]);
    const [biaya,setBiaya] = useState([]);
    const history = useHistory();
    const Id = localStorage.getItem('id')

    const autorization = () => {
        axios.get(`http://localhost:3000/authenticated`,{
            headers: {
                "x-access-token": localStorage.getItem('token')
            }})
        .then(res => {
            console.log(res.data.auth);
            if(res.data.auth === false){
                history.push('/');
            }
        })
        .catch(err => {
            console.log(err.response.message);
        })
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/addpasien',{
            nama,
            alamat,
            no_telp,
            jenis_kelamin,
            tanggal_daftar,
            Golongan_darah,
            kode_penyakit,
            kode_kamar,
            kode_biaya
        })
        .then(res => {
            console.log(res.data);
           history.push('/pasien');
        })
        .catch(err => {
            console.log(err);
        })
    }

    const getpenyakit = () => {
        axios.get('http://localhost:3000/penyakit',{
            headers: {
                "x-access-token": localStorage.getItem('token')
            }})
        .then(res => {
            console.log(res);
            setPenyakit(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    }

    const getkamar = () => {
        axios.get('http://localhost:3000/kamar',{
            headers: {
                "x-access-token": localStorage.getItem('token')
            }})
        .then(res => {
            console.log(res);
            setKamar(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    }
    

    const getbiaya = () => {
        axios.get('http://localhost:3000/biaya',{
            headers: {
                "x-access-token": localStorage.getItem('token')
            }})
        .then(res => {
            console.log(res);
            setBiaya(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    }

    useEffect(()=>{
        getpenyakit();
        getkamar();
        getbiaya();
        autorization();
    },[])
    
    return(
        //form pasien
        <div className="login">
        <div className="d-flex justify-content-center">
            <div className="" style={{marginTop: "120px"}}>
                {/* card form pasien  */}
                <Card style={{ width: '60rem' }}>
                    <Card.Header>Pasien </Card.Header>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <Form onSubmit={handleSubmit}>
                                <div className="d-flex flex-column">
                                    {/* nama */}
                                    <label>Nama Pasien: </label>
                                    <Form.Control type="text" value={nama} onChange={(e)=> setNama(e.target.value)} placeholder="nama pasien" /><br/>
                                    {/* no telepon */}
                                    <label>No Telepon:</label>
                                    <Form.Control type="text" value={no_telp} onChange={(e)=> setNo_telp(e.target.value)} placeholder="no telepon" /><br/>
                                    {/* tanggal daftar */}
                                    <label>Tanggal Daftar</label>
                                    <Form.Control type="date" value={tanggal_daftar} onChange={(e)=> setTanggal_daftar(e.target.value)} placeholder="name@example.com" />
                                    {/* pilih biaya */}
                                    <div className="p-2 col-example text-left">
                                        <div className="d-flex justify-content-start">
                                            <div className="p-2 col-example text-left">
                                                <label>Biaya:</label>
                                                <Form.Select size="sm" value={kode_biaya} onChange={(e)=> setKode_biaya(e.target.value)}>
                                                    <option value="">Pilih Biaya</option>
                                                    {biaya.map(item => {
                                                        return(
                                                            <option key={item.kode_biaya} value={item._id}>{item.nama_biaya}</option>
                                                        )
                                                    })}
                                                </Form.Select>
                                            </div>
                                            
                                            {/* pilih Kamar */}
                                            <div className="p-2 col-example text-left">
                                                <label>Kamar:</label>
                                                <Form.Select size="sm" value={kode_kamar} onChange={(e)=> setKode_kamar(e.target.value)}>
                                                    <option value="">Pilih Kamar</option>
                                                    {kamar.map(item => {
                                                        return(
                                                            <option key={item.kode_kamar} value={item._id}>{item.nama_kamar}</option>
                                                        )
                                                    })}
                                                </Form.Select>
                                            </div>

                                            {/* pilih jenis_kelamin */}
                                            <div className="p-2 col-example text-left">
                                            <label>Jenis Kelamin:</label>
                                                <Form.Select size="sm" value={jenis_kelamin} onChange={(e)=> setJenis_kelamin(e.target.value)}>
                                                    <option>Laki-Laki</option>
                                                    <option>Perempuan</option>
                                                </Form.Select>

                                            </div>

                                            {/* pilih penyakit */}
                                            <div className="p-2 col-example text-left">
                                                <label>Penyakit:</label>
                                                <Form.Select size="sm" value={kode_penyakit} onChange={(e)=> setKode_penyakit(e.target.value)}>
                                                    <option value="-">Pilih Penyakit</option>
                                                    {penyakit.map(item => {
                                                        return(
                                                            <option key={item._id} value={item._id}>{item.nama_penyakit}</option>
                                                        )
                                                    })}
                                                </Form.Select>
                                            </div>

                                            {/* pilih golongan_darah */}
                                            <div className="p-2  col-example text-left">
                                                <label>Golongan Darah:</label>
                                                <Form.Select size="sm" value={Golongan_darah} onChange={(e)=> setGolongan_darah (e.target.value)}>
                                                    <option>A</option>
                                                    <option>B</option>
                                                    <option>AB</option>
                                                    <option>O</option>
                                                </Form.Select>
                                            </div>
                                        </div>
                                    </div>

                                    {/* alamat */}
                                    <label>Alamat:</label> 
                                    <Form.Control type="text" value={alamat} onChange={(e)=> setAlamat(e.target.value)} placeholder="alamat" /><br/>        
                                    <div className="d-flex flex-row-reverse">
                                        <div className="p-2"><button type="submit" className="btn btn-primary" size="sm">Tambah</button></div>
                                        <div className="p-2"><Link to={`/pasien`} className="btn btn-primary" >Batal</Link>{' '}</div>
                                    </div>
                                </div>
                            </Form>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </div>
            </div>
    </div>
    );

}
export default T_pasien;
