package com.cero.cm.biz.v1.authenticated.diary.service;

import com.cero.cm.biz.v1.authenticated.diary.model.req.DelDiaryReq;
import com.cero.cm.biz.v1.authenticated.diary.model.req.GetDiaryReq;
import com.cero.cm.biz.v1.authenticated.diary.model.req.SetDiaryReq;
import com.cero.cm.biz.v1.authenticated.diary.model.res.GetDiaryListRes;
import com.cero.cm.biz.v1.authenticated.diary.model.res.GetDiaryRes;
import com.cero.cm.db.entity.Diary;
import com.cero.cm.db.repository.Diary.DiaryRepository;
import com.cero.cm.util.TokenUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Service
@RequiredArgsConstructor
public class DiaryService {

    private final DiaryRepository diaryRepository;

    @Transactional
    public Diary setDiary(SetDiaryReq req) {

        Long userId = TokenUtil.getUserId();
        LocalDateTime now = LocalDateTime.now();

        Diary diary = new Diary();
        diary.setTitle(req.getTitle());
        diary.setContent(req.getContent());
        diary.setUserId(userId);
        diary.setRegDt(now);
        diary.setModDt(now);
        diary.setScore(req.getScore());
        diary.setDelYn("N");

        return diaryRepository.save(diary);
    }

    @Transactional
    public Diary setTestDiary(SetDiaryReq req, LocalDateTime date) {

            Long userId = TokenUtil.getUserId();

            Diary diary = new Diary();
            diary.setTitle(req.getTitle());
            diary.setContent(req.getContent());
            diary.setUserId(userId);
            diary.setRegDt(date);
            diary.setModDt(date);
            diary.setScore(req.getScore());
            diary.setDelYn("N");

            return diaryRepository.save(diary);
    }

    public GetDiaryRes getDiary(GetDiaryReq req) {
        Long userId = TokenUtil.getUserId();

        LocalDateTime date = req.getDate();
        LocalDateTime startDt = date.toLocalDate().atStartOfDay();
        LocalDateTime endDt = date.toLocalDate().atTime(23, 59, 59, 999);
        GetDiaryRes diary = diaryRepository.getDiaryByDate(startDt, endDt, userId);

        return diary;
    }

    public PageImpl<GetDiaryListRes> getDiaryList(Pageable pageable, String sort) {
        Long userId = TokenUtil.getUserId();
        return diaryRepository.getDiaryListByUserId(pageable, userId, sort);
    }

    @Transactional
    public String delDiary(DelDiaryReq req) {
        Long userId = TokenUtil.getUserId();
        Diary diary = diaryRepository.getDiaryByUserIdAndDiaryId(userId, req.getDiaryId());

        if (diary == null) {
            return "fail";
        }

        diary.setDelYn("Y");
        diaryRepository.save(diary);

        return "success";
    }

    public Boolean checkDiary() {
        Long userId = TokenUtil.getUserId();
        //Today
        LocalDateTime today = LocalDate.now().atStartOfDay();
        Long diary = diaryRepository.getDiaryCountByUserIdAndDate(userId, today);

        if(diary > 0){
            return true;//작성했다는 뜻
        }

        return false;
    }
}
