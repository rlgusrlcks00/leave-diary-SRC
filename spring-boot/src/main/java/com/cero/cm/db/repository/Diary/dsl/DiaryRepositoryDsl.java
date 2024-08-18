package com.cero.cm.db.repository.Diary.dsl;

import com.cero.cm.biz.v1.authenticated.diary.model.res.GetDiaryListRes;
import com.cero.cm.biz.v1.authenticated.diary.model.res.GetDiaryRes;
import com.cero.cm.db.entity.Diary;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;

public interface DiaryRepositoryDsl {
    GetDiaryRes getDiaryByDate(LocalDateTime startDate, LocalDateTime endDate, Long userId);

    Diary getDiaryByUserIdAndDiaryId(Long userId, Long diaryId);

    Long getDiaryCountByUserIdAndDate(Long userId, LocalDateTime today);

    PageImpl<GetDiaryListRes> getDiaryListByUserId(Pageable pageable, Long userId, String sort);
}
