import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import {
    MdBlock,
    MdKeyboardArrowRight,
} from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { getIndividualMatchDetails } from "../../api/apiMethods";
import { useSearchParams } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import { showDate } from "../../utils/utcDateConversion";
import moment from 'moment';

const MatchIndividualDetails = () => {
    const navigate = useNavigate();
    const { matchId, sportName } = useParams();
    const [matchOdds, setMatchOdds] = useState([]);
    const [bookmaker, setBookmaker] = useState([]);
    const [fancy, setFancy] = useState([]);
    const [matchDetails, setMatchDetails] = useState({});

    const getSportMatchesList = async (matchId) => {
        try {
            const response = await getIndividualMatchDetails(matchId)
            if (response) {
                const { odds, bookMake, fancy, matchDetails } = response?.records
                setMatchDetails(matchDetails)
                setBookmaker(bookMake)
                setMatchOdds(odds)
                setFancy(fancy)
            }
        } catch (err) {
            console.log(err)
            setMatchDetails({})
            setBookmaker([])
            setMatchOdds([])
            setFancy([])
        }
    }

    useEffect(() => {
        if (matchId) {
            getSportMatchesList(matchId)
        }
    }, [matchId])

    const renderOdds = (teamOdds) => {

        return (
            teamOdds?.map((odds) => (
                <div className="w-100 d-flex black-text border">
                    <div className="col-6 d-flex align-items-center ps-2">
                        {odds?.teamName}
                    </div>
                    <div className="col-1 d-flex flex-column back-box p-1 text-center border rounded">
                        <span>{odds?.back1?.toFixed(2) || '-'}</span>
                        <span>{odds?.bkcoun1 > 1000 ? `${(odds.bkcoun1 / 1000).toFixed(1)}k` : odds?.bkcoun1}</span>
                    </div>
                    <div className="col-1 d-flex flex-column back-box p-1 text-center border">
                        <span>{odds?.back2?.toFixed(2) || '-'}</span>
                        <span>{odds?.bkcoun2 > 1000 ? `${(odds.bkcoun2 / 1000).toFixed(1)}k` : odds?.bkcoun2}</span>
                    </div>
                    <div className="col-1 d-flex flex-column back-box p-1 text-center border">
                        <span>{odds?.back3?.toFixed(2) || '-'}</span>
                        <span>{odds?.bkcoun3 > 1000 ? `${(odds.bkcoun3 / 1000).toFixed(1)}k` : odds?.bkcoun3}</span>
                    </div>
                    <div className="col-1 d-flex flex-column lay-box p-1 text-center border">
                        <span>{odds?.lay1?.toFixed(2) || '-'}</span>
                        <span>{odds?.laycoun1 > 1000 ? `${(odds.laycoun1 / 1000).toFixed(1)}k` : odds?.laycoun1}</span>
                    </div>
                    <div className="col-1 d-flex flex-column lay-box p-1 text-center border">
                        <span>{odds?.lay2?.toFixed(2) || '-'}</span>
                        <span>{odds?.laycoun2 > 1000 ? `${(odds.laycoun2 / 1000).toFixed(1)}k` : odds?.laycoun2}</span>
                    </div>
                    <div className="col-1 d-flex flex-column lay-box p-1 text-center border">
                        <span>{odds?.lay3?.toFixed(2) || '-'}</span>
                        <span>{odds?.laycoun3 > 1000 ? `${(odds.laycoun3 / 1000).toFixed(1)}k` : odds?.laycoun3}</span>
                    </div>
                </div>
            ))

        );
    };

    return (
        <div className="">
            <div className="d-flex flex-end">
                <span className="input-css2 rounded-pill small-font me-4 px-3 text-black py-1 flex-center pointer hover-orange-clr"
                    onClick={() => navigate(-1)} >
                    <FaArrowLeft className="me-1 d-flex" /> Back </span>
            </div>

            <div className="d-flex flex-between mt-3 mb-2">
                <div className="large-font pointer flex-center">
                    <span className="grey-clr" onClick={() => navigate(-2)}>
                        Sports
                        <MdKeyboardArrowRight size={18} />
                        {sportName}
                    </span>
                    <span className="grey-clr" onClick={() => navigate(-1)}>
                        <MdKeyboardArrowRight size={18} />
                        IND Vs Australia
                    </span>
                </div>
                <div className="small-font flex-end">Total P/L : <span className="green-clr mx-1">2000000000</span>
                </div>
            </div>
            {/** Odds */}
            {matchOdds?.length > 0 && matchOdds?.map((detail) => (
                <div>
                    <h5 className="medium-font fw-600 text-capitalize">{detail?.vendor_name}</h5>
                    <div className="text-white odd-category-header d-flex flex-row justify-content-start align-items-center px-2 w-100 py-2 ">
                        <div className="medium-font fw-600">Match Odds</div>
                    </div>
                    <div className="w-100 border-box border" >
                        {/* Header row */}
                        <div className="w-100 d-flex fw-600 text-black pb-2 border">
                            <div className="col-6 ps-2">
                                Game
                            </div>

                            <div className="col-3 d-flex justify-content-center">
                                Back
                            </div>
                            <div className="col-3 d-flex justify-content-center">
                                Lay
                            </div>

                        </div>

                        {/* Odds rows */}
                        {renderOdds(detail.odds)}
                    </div>
                </div>
            ))}
            {/** BookMaker */}
            {bookmaker.length > 0 && bookmaker?.map((detail) => (
                <div>
                    <h5 className="medium-font fw-600 text-capitalize">{detail?.vendor_name}</h5>
                    <div className="text-white odd-category-header d-flex flex-row justify-content-start align-items-center px-2 w-100 py-2 ">
                        <div className="medium-font fw-600">Match Odds</div>
                    </div>
                    <div className="w-100 border-box border" >
                        {/* Header row */}
                        <div className="w-100 d-flex fw-600 text-black pb-2 border">
                            <div className="col-6 ps-2">
                                Game
                            </div>

                            <div className="col-3 d-flex justify-content-center">
                                Back
                            </div>
                            <div className="col-3 d-flex justify-content-center">
                                Lay
                            </div>

                        </div>

                        {/* Odds rows */}
                        {renderOdds(detail.odds)}
                    </div>
                </div>
            ))}
        </div>
    )
}
export default MatchIndividualDetails