import React, { useState, useEffect } from 'react';
import styles from './Calendar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAngleLeft,
    faAngleRight,
    faPlus,
    faTimes,
    faCircle,
    faArrowLeft,
    faArrowRight
} from '@fortawesome/free-solid-svg-icons';

interface Event {
    title: string;
    time: string;
}
interface Events {
    "day": number | null,
    "month": number,
    "year": number,
    data: Event[]
}


// Dans votre composant Calendar, vous pouvez utiliser cette interface :

function Calendar() {

    const [showEventForm, setShowEventForm] = useState(false);
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventTimeFrom, setEventTimeFrom] = useState('');
    const [eventTimeTo, setEventTimeTo] = useState('');

    const addEvent = () => {
        // Votre logique pour ajouter l'événement ici
        console.log('Ajouter événement :', eventName, eventDate, eventTimeFrom, eventTimeTo);

        // Réinitialiser les valeurs des champs d'entrée après l'ajout de l'événement

        const newEvent: Events = {
            day: activeDay,
            year: year,
            month: month+1,
            data: [
                {
                    title: eventName,
                    time: eventTimeFrom
                }
            ]
        }

        storeEvent(newEvent);
        setEventName('');
        setEventDate('');
        setEventTimeFrom('');
        setEventTimeTo('');

    };


    const [activeDay, setActiveDay] = useState<number | null>(null); // Définir le type de activeDay comme number ou null
    const [month, setMonth] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());
    const [eventsArr, setEventsArr] = useState<Events[]>([]);
    const [eventsOfDay, setEventsOfDay] = useState<{day: number, month: number, year: number } | undefined>(undefined);

    useEffect(() => {
        initCalendar();
        getEvents();
    }, []);

    const months = [
        "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
        "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
    ];


    function initCalendar() {
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const prevLastDay = new Date(year, month, 0);
        const prevDays = prevLastDay.getDate();
        const lastDate = lastDay.getDate();
        const dayOfWeek = firstDay.getDay();
        const nextDays = 7 - lastDay.getDay() - 1;

        const days = [];
        for (let x = dayOfWeek; x > 0; x--) {
            days.push({ day: prevDays - x + 1, isPrevMonth: true });
        }
        for (let i = 1; i <= lastDate; i++) {
            days.push({ day: i, isPrevMonth: false });
        }
        for (let j = 1; j <= nextDays; j++) {
            days.push({ day: j, isPrevMonth: true });
        }

        const today = new Date();
        const activeMonth = today.getMonth();
        const activeYear = today.getFullYear();
        const activeDate = today.getDate();

        const activeDayIndex = days.findIndex(day => !day.isPrevMonth && day.day === activeDate);

        setMonth(activeMonth);
        setYear(activeYear);
        // setActiveDay(activeDayIndex);
    }

    function prevMonth() {
        setMonth(month - 1);
        if (month === 0) {
            setMonth(11);
            setYear(year - 1);
        }
    }

    function nextMonth() {
        setMonth(month + 1);
        if (month === 11) {
            setMonth(0);
            setYear(year + 1);
        }
    }

    function getEvents() {
        const savedEvents = localStorage.getItem("events");
        if (savedEvents) {
            setEventsArr(JSON.parse(savedEvents));
        }
    }

    function saveEvents() {
        localStorage.setItem("events", JSON.stringify(eventsArr));
    }

    function storeEvent(event:Events) {
        let isAlreadyExist = true;
        const events = eventsArr.map(evt => {
            if ( evt.day == event.day && evt.month == event.month && evt.year == event.year ) {
                isAlreadyExist = false;
                evt.data = [...evt.data, ...event.data]
                return evt;
            }else {
                return evt
            }
        } )
        if ( isAlreadyExist ) {
            events.push(event);
        }

        localStorage.setItem("events", JSON.stringify(events));
        getEvents();
    }
    function getEventsOfDay() {
        const evts = eventsArr.filter(events => events.day === eventsOfDay?.day && events.month === eventsOfDay.month && events.year === eventsOfDay.year );
            const [eventsData]  = evts.map(evt => evt.data);
            // return []
        return eventsData;
    }

    function goToToday() {
        const today = new Date();
        setMonth(today.getMonth());
        setYear(today.getFullYear());
        initCalendar();
    }


    function renderDays() {
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const prevLastDay = new Date(year, month, 0);
        const prevDays = prevLastDay.getDate();
        const lastDate = lastDay.getDate();
        const day = firstDay.getDay();
        const nextDays = 7 - lastDay.getDay() - 1;

        let daysJSX = [];

        // Jours du mois précédent
        for (let x = day; x > 0; x--) {
            daysJSX.push(<div className={`${styles.day} ${styles['prev-date']}`}> {prevDays - x + 1}</div>) ;
        }

        // Jours du mois en cours
        for (let i = 1; i <= lastDate; i++) {
            let classNames = styles.day;
            if (i === activeDay && year === new Date().getFullYear() && month === new Date().getMonth()) {
                classNames += ` ${styles.active}`;
            }
            eventsArr.forEach(evt => {
                if (evt.day === i) {
                    classNames += ` ${styles.event}`
                }
            } )
            daysJSX.push( <div className={classNames} onClick={() => { setActiveDay(i); setEventsOfDay({day: i, month: month+1, year }); console.log("cc") }} >{i}</div> )
        }

        // Jours du mois suivant
        for (let j = 1; j <= nextDays; j++) {
            daysJSX.push( <div className={`${styles.day} ${styles['next-date']}`}>{j}</div> )
            // daysJSX += `<div class="${styles.day} ${styles['next-date']}">${j}</div>`;
        }

        return daysJSX;
    }

    // Rest of your functions

    return (
        <div className={styles.container}> {/* Utilisation des styles à partir du module CSS */}
            {/* Côté gauche */}
            <div className={styles.left}>
                <div className={styles.calendar}>
                    {/* Contenu du côté gauche */}
                    {/* En-tête du calendrier */}
                    <div className={styles.month}>
                        {/* Bouton pour passer au mois précédent */}
                        <FontAwesomeIcon icon={faArrowLeft} onClick={prevMonth} />
                        {/* Affichage du mois et de l'année en cours */}
                        <div className={styles.date}>{months[month]} {year}</div>
                        {/* Bouton pour passer au mois suivant */}
                        <FontAwesomeIcon icon={faArrowRight} onClick={nextMonth} />
                    </div>
                    {/* Jours de la semaine */}
                    <div className={styles.weekdays}>
                        <div>Dim</div>
                        <div>Lun</div>
                        <div>Mar</div>
                        <div>Mer</div>
                        <div>Jeu</div>
                        <div>Ven</div>
                        <div>Sam</div>
                    </div>
                    {/* Grille des jours */}
                    <div className={styles.days}>
                        {/* Logique pour afficher les jours du mois */}
                        {/* Assurez-vous d'utiliser activeDay pour marquer le jour actif */}
                        {renderDays()}
                    </div>
                    {/* Aller au calendrier d'aujourd'hui */}
                    {/*<div className={styles['goto-today']}>*/}
                    {/*    <div className={styles.goto}>*/}
                    {/*        <input type="text" placeholder="mm/yyyy" className={styles['date-input']} />*/}
                    {/*        <button className={styles['goto-btn']}>Go</button>*/}
                    {/*    </div>*/}
                    {/*    <button className={styles['today-btn']} onClick={goToToday}>Today</button>*/}
                    {/*</div>*/}
                </div>
            </div>
            {/* Côté droit */}
            <div className={styles.right}>
                {/* Affichage de la date actuelle */}
                <div className={styles['today-date']}>
                    <div className={styles['event-day']}>{activeDay}</div>
                    <div className={styles['event-date']}>{activeDay} {months[month]} {year}</div>
                </div>
                {/* Liste des événements */}
                <div className={styles.events}>
                    {/* Logique pour afficher les événements */}
                    {eventsArr.length !== 0 && getEventsOfDay()?.map(eventItem => (
                        <div className={styles.event}>
                            <div className={styles.title}>
                                <FontAwesomeIcon icon={faCircle} />
                                <h3 className={styles['event-title']}>{eventItem.title}</h3>
                            </div>
                            <div className={styles['event-time']}>
                                <span className={styles['event-time']}>{eventItem.time}</span>
                            </div>
                        </div>
                    ))}
                    {/* Affichage si aucun événement */}
                    {eventsArr.length === 0 && <div className={styles['no-event']}><h3>Pas d'événements</h3></div>}
                </div>
                {/* Formulaire d'ajout d'événement */}
                <div className={`${styles['add-event-wrapper']}  ${ showEventForm && styles.active}`}>
                    <div className={styles['add-event-header']}>
                        <div className={styles.title}>Ajouter Evenement</div>
                        <FontAwesomeIcon icon={faTimes} className={styles.close}  onClick={() => setShowEventForm(false)} />
                    </div>
                    <div className={styles['add-event-body']}>
                        {/* Inputs pour ajouter un événement */}
                        <div className={styles['add-event-input']}>
                            <input
                                type="text"
                                placeholder="Nom Evenement"
                                value={eventName}
                                onChange={(e) => setEventName(e.target.value)}
                            />
                        </div>
                        <div className={styles['add-event-input']}>
                            <input
                                type="text"
                                placeholder="Date Evenement"
                                value={eventDate}
                                onChange={(e) => {
                                    let value = e.target.value;
                                    value = value.replace(/[^0-9/]/g, "");
                                    if (value.length === 2 || value.length === 5) {
                                        if (!value.endsWith("/")) {
                                            value += "/";
                                        }
                                    } else if (value.length > 10) {
                                        value = value.slice(0, 10);
                                    }
                                    setEventDate(value)
                                }}
                            />
                        </div>
                        <div className={styles['add-event-input']}>
                            <input
                                type="text"
                                placeholder="Heure Evenement (De)"
                                value={eventTimeFrom}
                                onChange={(e) => {
                                    let value = e.target.value;
                                    value = value.replace(/[^0-9:]/g, "");
                                    if (value.length === 2) {
                                        value += ":";
                                    }
                                    if (value.length > 5) {
                                        value = value.slice(0, 5);
                                    }
                                    setEventTimeFrom(value)
                                }}
                            />
                        </div>
                        <div className={styles['add-event-input']}>
                            <input
                                type="text"
                                placeholder="Heure Evenement (À)"
                                value={eventTimeTo}
                                className={styles['event-time-to']}
                                onChange={(e) =>  {
                                    let value = e.target.value;
                                    value = value.replace(/[^0-9:]/g, "");
                                    if (value.length === 2) {
                                        value += ":";
                                    }
                                    if (value.length > 5) {
                                        value = value.slice(0, 5);
                                    }
                                    setEventTimeTo(value)
                                }}
                            />
                        </div>
                        <button onClick={addEvent}>Ajouter Evenement</button>
                    </div>
                    <div className={styles['add-event-footer']}>
                        <button className={styles['add-event-btn']} >Ajouter Evenement</button>
                    </div>
                </div>
            </div>
            {/* Bouton pour ajouter un événement */}
            <button className={styles['add-event']}>
                <FontAwesomeIcon icon={faPlus} onClick={() => activeDay && setShowEventForm(true)} />
            </button>
        </div>
    );
}

export default Calendar;
