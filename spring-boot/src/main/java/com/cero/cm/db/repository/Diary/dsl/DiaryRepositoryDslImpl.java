package com.cero.cm.db.repository.Diary.dsl;

import com.cero.cm.biz.v1.authenticated.diary.model.res.GetDiaryListRes;
import com.cero.cm.biz.v1.authenticated.diary.model.res.GetDiaryRes;
import com.cero.cm.db.entity.Diary;
import com.cero.cm.db.entity.QDiary;
import com.cero.cm.util.JpaPageUtil;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;

@Aspect
@RequiredArgsConstructor
public class DiaryRepositoryDslImpl implements DiaryRepositoryDsl{

    private final JPAQueryFactory queryFactory;
    private final JpaPageUtil jpaPageUtil;
    private final QDiary qDiary = com.cero.cm.db.entity.QDiary.diary;
    public GetDiaryRes getDiaryByDate(LocalDateTime startDate, LocalDateTime endData ,Long userId) {
        JPQLQuery<GetDiaryRes> query = queryFactory
                .select(Projections.fields(GetDiaryRes.class,
                        qDiary.diaryId ,qDiary.title, qDiary.content, qDiary.modDt, qDiary.score))
                .from(qDiary)
                .where(qDiary.userId.eq(userId)
                        .and(qDiary.modDt.between(startDate, endData))
                        .and(qDiary.delYn.ne("Y")));

        return query.fetchOne();
    }

    public Diary getDiaryByUserIdAndDiaryId(Long userId, Long diaryId) {
        JPQLQuery<Diary> query = queryFactory
                .select(qDiary)
                .from(qDiary)
                .where(qDiary.userId.eq(userId)
                        .and(qDiary.diaryId.eq(diaryId))
                        .and(qDiary.delYn.ne("Y")));
        return query.fetchOne();
    }

    public Long getDiaryCountByUserIdAndDate(Long userId, LocalDateTime today) {
        JPQLQuery<Long> query = queryFactory
                .select(qDiary.count())
                .from(qDiary)
                .where(qDiary.userId.eq(userId)
                        .and(qDiary.regDt.gt(today))
                        .and(qDiary.delYn.ne("Y")));
        return query.fetchOne();
    }

    public PageImpl<GetDiaryListRes> getDiaryListByUserId(Pageable pageable, Long userId, String sort) {
        JPQLQuery<GetDiaryListRes> query = queryFactory
                .select(Projections.fields(GetDiaryListRes.class,
                        qDiary.diaryId, qDiary.title, qDiary.content, qDiary.score, qDiary.modDt))
                .from(qDiary)
                .where(qDiary.userId.eq(userId)
                        .and(qDiary.delYn.ne("Y")));

        if ("asc".equalsIgnoreCase(sort)) {
            query.orderBy(qDiary.modDt.asc());
        } else if ("desc".equalsIgnoreCase(sort)) {
            query.orderBy(qDiary.modDt.desc());
        } else {
            // 기본 정렬 순서 설정 (옵션)
            query.orderBy(qDiary.modDt.desc());
        }

        return jpaPageUtil.getPageImpl(pageable, query, GetDiaryListRes.class);
    }
}
