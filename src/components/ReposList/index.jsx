import { useEffect, useState } from "react";
import styles from './ReposList.module.css'

const ReposList = ({ nomeUsuario }) => {
    const [repos, setRepos] = useState([]);
    const [estaCarregando, setEstaCarregando] = useState(true);
    const [achouErro, setAchouErro] = useState(true);

    useEffect(() => {
        setEstaCarregando(true);
        setAchouErro(false);
        fetch(`https://api.github.com/users/${nomeUsuario}/repos`)
            .then(res => {
                if (res.status === 404) {
                    throw new Error(console.warn("O usuário não existe ou o nome está inválido!"), alert("O usuário não existe ou o nome está inválido!")
                    )
                } else {
                    return res.json();
                }
            })
            .then(resJson => {
                setTimeout(() => {
                    setEstaCarregando(false);
                    setRepos(resJson)
                }, 3000)
            })
            .catch(error => {
                setEstaCarregando(false)
                setAchouErro(error.message)
                console.log("Houve um erro", error)
            })
    }, [nomeUsuario])

    return (
        <>

            {achouErro ? (
                <h1>Erro encontrado</h1>
            ) : (
                <div className="container">
                    {estaCarregando ? (
                        <h1>Carregando. . .</h1>
                    ) : (
                        <ul className={styles.list}>
                            {repos.map(({ id, name, language, html_url }) => (
                                <li className={styles.listItem} key={id}>
                                    <div className={styles.itemName}>
                                        <b>Nome</b> {name}
                                    </div>
                                    <div className={styles.itemLanguage}>
                                        <b>Linguagem</b> {language}
                                    </div>
                                    <a className={styles.itemLink} target="blank" href={html_url}>Visitar no GitHub</a>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </>
    )
}

export default ReposList;