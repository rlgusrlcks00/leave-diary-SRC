package com.cero.cm.db.repository.Diary;

import com.cero.cm.db.entity.Diary;
import com.cero.cm.db.repository.Diary.dsl.DiaryRepositoryDsl;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DiaryRepository extends DiaryRepositoryDsl, JpaRepository<Diary, Long>{
}
