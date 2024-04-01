import styles from "./Home.module.css"
import {PropsWithChildren} from "react";
import {Link} from "react-router-dom";
import Header from "../../components/header/header";
import Footer from "../../../landingpage/components/Footer/footer.component";
export  default function Home () {

    return <div className={""} >
        {/*<Header/>*/}
        <div className={styles.sectionContainers} >
            <Section1/>
        </div>
    </div>

}


function Section1 ({children}: PropsWithChildren) {
    return <section className={`${styles.sectionWrapper} ${styles.sectionWrapper1}` }  >
        {children}
        <Footer/>
    </section>
}


function Section2 ({children}: PropsWithChildren) {
    return <section className={`${styles.sectionWrapper} ${styles.sectionWrapper2}` }  >
        <div className={styles.container}>
            <div className={styles.left}>
                <div className={styles.left_nav}>
                    <div className={styles.option_left_P}>
                        <p>Navigation</p>

                        <div><i className='bx bx-plus'></i></div>
                    </div>
                    <div className={styles.option}>
                        <div className={`${styles.option_left}`}>
                            <a href="#">
                                <i className='bx bx-home'></i>
                                Accueil
                            </a>
                        </div>
                        <div className="option_left">
                            <i className='bx bx-user'></i>
                            <a href="#">Patients</a>
                        </div>
                        <div className="option_left">
                            <i className='bx bx-first-aid'></i>
                            <a href="#">Médicaments</a>
                        </div>
                        <div className="option_left">
                            <i className='bx bx-list-ul'></i>
                            <a href="#">Listes des Actes</a>
                        </div>
                        <div className="option_left">
                            <i className='bx bx-bed'></i>
                            <a href="#">Chambres</a>
                        </div>
                        <div className="option_left">
                            <i className='bx bx-group'></i>
                            <a href="#">Rendez-vous</a>
                        </div>
                        <div className="option_left">
                            <i className='bx bx-line-chart'></i>
                            <a href="#">Statistiques</a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="right">

            </div>

            <div className="center">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur deleniti ipsum, dolore unde, tenetur dolor, rerum ullam recusandae officia dolorum excepturi ut voluptatem saepe quas ea aliquid voluptatibus error inventore!Lorem</p>
            </div>
        </div>

    </section>
}


function Section3 ({children}: PropsWithChildren) {
    return <section className={styles.sectionWrapper}  >
        {children}
        dsd
    </section>
}