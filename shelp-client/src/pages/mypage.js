function Mypage () {
    return (
        <div>
            <section>
                <div>
                    <input type='image' src='https://www.freeiconspng.com/thumbs/pepe-png/pepe-png-free-download-16.png'/>
                </div>
                <div>
                    <ul>
                        <li>
                            pepe
                            <button>edit</button>
                        </li>
                        <li>
                            pepepthefrog29@gmail.con
                            <button>edit</button>
                        </li>
                        <li>
                            feels good man
                            <button>edit</button>
                        </li>
                    </ul>
                </div>
            </section>
            <setting>
                <div className='option1'>
                    <input type='radio' name='setalrm' value='1d' />
                    <input type='radio' name='setalrm' value='3d' />
                    <input type='radio' name='setalrm' value='5d' />
                </div>
                <div>
                    option2
                </div>
                <div>
                    option3
                </div>
            </setting>
            <div>
                <button>save</button>
            </div>
        </div>
    )
}
export default Mypage;
