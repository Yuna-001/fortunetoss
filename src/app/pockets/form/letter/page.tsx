"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Notice from "../../../../components/notice";
import usePocketStore from "../../../store/usePocket";
import CardList from "../../../../utils/images/cardList";
import CardInteraction from "../../../../utils/images/cardInteraction";
import { cardData } from "../../../../utils/images/cardNames";
import { submitCustomQuestion } from "../../../../api/api-form";
import Header from "@/components/header/header";
import BackButton from "@/components/header/back-button";
import useModifiedStore from "@/app/store/modifiedStore";
import {postEdit} from "@/api/api-postEdit";
import {buttonBackClick} from "@/components/edit/buttonBackClick";

const Letter = () => {
    const router = useRouter();
    const questionCustomId = usePocketStore((state) => state.questionCustomId);
    // 상태에서 복주머니 ID 가져오기



    const {
        title,
        answers,
        correctAnswer,
        content,
        setContent,
        card,
        setCard,
        domain,
        setStep,
    } = usePocketStore();

    const [selectedCard, setSelectedCard] = useState<string>("A"); // 선택된 카드 이름 저장

    //수정사항
    const { isModified, setModified } = useModifiedStore();

    //카드 선택
    const handleSelectedCard = (name: string) => {
        setSelectedCard(name); // 선택된 카드 이름 업데이트
        setCard(name);
        setModified(true);
        //카드재선택->상태수정됨

    };



    //덕담 입력
    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        setContent(newValue);
        console.log(newValue);
        setModified(true);
        //덕담입력재수정-> 상태수정됨

    };

    //다음 버튼
    const handleNextClick = async () => {

        if (!content?.trim()) {
            alert("덕담을 입력해주세요!");
            return;
        }

        if (!selectedCard) {
            alert("카드를 선택해주세요!");
            return;
        }

        setCard(selectedCard); // 선택된 카드 이름 저장

        try {
            if (isModified && questionCustomId) {
                const response = await postEdit(
                    title,
                    answers,
                    correctAnswer,
                    card,
                    domain,
                    content
                );
                console.log(response);
                alert("문제 수정 완료!");
            } else {
                const response = await submitCustomQuestion(
                    title,
                    answers,
                    correctAnswer,
                    card,
                    domain,
                    content
                );

                console.log("POST 성공:", response);

            }
            setStep(4);
            router.push(`/pockets/complete?questionId=${questionCustomId}`);

        } catch (error) {
            console.error("POST 요청 실패:", error);
            alert("복주머니를 만드는 중 문제가 발생했습니다. 다시 시도해주세요.");
        }
    };

    return (
        <div>
            <Header>
                <BackButton
                    onClick={ async () => {
                        if (questionCustomId) {
                            buttonBackClick(questionCustomId); // 데이터 가져오기 및 상태 업데이트
                            history.back();
                        } else {
                            history.back(); // 단순 뒤로 가기
                        }
                    }}
                />
            </Header>
            <div className="p-4">
                <Notice text="새해 덕담을 작성해주세요!"/>

                {/* 카드 리스트 */}
                <CardList selectedCard={selectedCard} onSelect={handleSelectedCard}/>

                {/* 카드 디스플레이 */}
                <CardInteraction
                    selectedCard={selectedCard}
                    onContentChange={handleContentChange}

                />


                {/* 다음 버튼 */}
                <div className="flex justify-end mt-6">
                    <button
                        className="text-blue text-2xl px-4 py-2 rounded-lg"
                        onClick={handleNextClick}
                    >
                        완료
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Letter;
