package com.cero.cm.biz.v1.authenticated.diary.controller;

import com.cero.cm.biz.v1.authenticated.diary.model.req.DelDiaryReq;
import com.cero.cm.biz.v1.authenticated.diary.model.req.GetDiaryReq;
import com.cero.cm.biz.v1.authenticated.diary.model.req.SetDiaryReq;
import com.cero.cm.biz.v1.authenticated.diary.model.res.GetDiaryListRes;
import com.cero.cm.biz.v1.authenticated.diary.model.res.GetDiaryRes;
import com.cero.cm.biz.v1.authenticated.diary.service.DiaryService;
import com.cero.cm.common.api.model.Response;
import com.cero.cm.common.type.ResultCodeConst;
import com.cero.cm.db.entity.Diary;

import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

import static com.cero.cm.util.MessageUtils.messageSourceAccessor;

@RestController
@RequestMapping(path = "/diary")
@CrossOrigin("*")
@RequiredArgsConstructor
@Api(tags = {"이별 일기"})
public class DiaryController {

    private final DiaryService diaryService;

    @Operation(
            summary = "일기 쓰기",
            description = "일기 쓰기"
    )
    @PostMapping(path = "/set")
    public Response<Diary> setDiary(
            @RequestParam(value = "title")  String title,
            @RequestParam(value = "content")  String content,
            @RequestParam(value = "score") Long score
    ) {
        Response<Diary> res = new Response<>();
        try{
            SetDiaryReq req = new SetDiaryReq();
            req.setTitle(title);
            req.setContent(content);
            req.setScore(score);
            res.setResult(diaryService.setDiary(req));
            res.setResultCd(ResultCodeConst.SUCCESS.getCode());
            res.setResultMsg(messageSourceAccessor.getMessage(res.getResultCd()));

        } catch (Exception e){
            res.setResultCd(ResultCodeConst.FAIL.getCode());
            res.setResultMsg(e.getMessage());
        }

        return res;
    }

    @Operation(
            summary = "일기 불러오기",
            description = "일기 불러오기"
    )
    @GetMapping(path = "/get")
    public Response<GetDiaryRes> setDiary(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
            @Parameter(description = "Start date in the format yyyy-MM-ddTHH:mm:ss", example = "2023-07-01T00:00:00")
            @Schema(type = "string", format = "date-time")
            LocalDateTime date
    ) {
        Response<GetDiaryRes> res = new Response<>();
        try{
            GetDiaryReq req = new GetDiaryReq();
            req.setDate(date);

            res.setResult(diaryService.getDiary(req));
            res.setResultCd(ResultCodeConst.SUCCESS.getCode());
            res.setResultMsg(messageSourceAccessor.getMessage(res.getResultCd()));

        } catch (Exception e){
            res.setResultCd(ResultCodeConst.FAIL.getCode());
            res.setResultMsg(e.getMessage());
        }

        return res;
    }

    @Operation(
            summary = "일기 삭제하기",
            description = "일기 삭제하기"
    )
    @PostMapping(path = "/del")
    public Response<String> setDiary(
            @RequestParam(value = "diaryId") Long diaryId
    ) {
        Response<String> res = new Response<>();
        try{
            DelDiaryReq req = new DelDiaryReq();
            req.setDiaryId(diaryId);

            res.setResult(diaryService.delDiary(req));
            res.setResultCd(ResultCodeConst.SUCCESS.getCode());
            res.setResultMsg(messageSourceAccessor.getMessage(res.getResultCd()));

        } catch (Exception e){
            res.setResultCd(ResultCodeConst.FAIL.getCode());
            res.setResultMsg(e.getMessage());
        }

        return res;
    }

    @Operation(
            summary = "일기 작성 확인",
            description = "일기 작성 확인"
    )
    @GetMapping(path = "/check")
    public Response<Boolean> checkDiary () {
        Response<Boolean> res = new Response<>();
        try{
            res.setResult(diaryService.checkDiary());
            res.setResultCd(ResultCodeConst.SUCCESS.getCode());
            res.setResultMsg(messageSourceAccessor.getMessage(res.getResultCd()));

        } catch (Exception e){
            res.setResultCd(ResultCodeConst.FAIL.getCode());
            res.setResultMsg(e.getMessage());
        }
        return res;
    }

    @Operation(
            summary = "이별 일기 리스트",
            description = "이별 일기 리스트"
    )
    @GetMapping(path = "/getlist")
    public Response<PageImpl<GetDiaryListRes>> getDiaryList (
            Pageable pageable,
            @RequestParam(value = "sort") String sort
    ) {
        Response<PageImpl<GetDiaryListRes>> res = new Response<>();
        try{
            res.setResult(diaryService.getDiaryList(pageable, sort));
            res.setResultCd(ResultCodeConst.SUCCESS.getCode());
            res.setResultMsg(messageSourceAccessor.getMessage(res.getResultCd()));

        } catch (Exception e){
            res.setResultCd(ResultCodeConst.FAIL.getCode());
            res.setResultMsg(e.getMessage());
        }
        return res;
    }

    @Operation(
            summary = "테스트 케이스 작성",
            description = "테스트 케이스 작성"
    )
    @PostMapping(path = "/test")
    public Response<Diary> setDiaryTest(
            @RequestParam(value = "title")  String title,
            @RequestParam(value = "content")  String content,
            @RequestParam(value = "score") Long score,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
            @Parameter(description = "Start date in the format yyyy-MM-ddTHH:mm:ss", example = "2023-07-01T00:00:00")
            @Schema(type = "string", format = "date-time")
            LocalDateTime date
    ) {
        Response<Diary> res = new Response<>();
        try{
            SetDiaryReq req = new SetDiaryReq();
            req.setTitle(title);
            req.setContent(content);
            req.setScore(score);
            res.setResult(diaryService.setTestDiary(req, date));
            res.setResultCd(ResultCodeConst.SUCCESS.getCode());
            res.setResultMsg(messageSourceAccessor.getMessage(res.getResultCd()));

        } catch (Exception e){
            res.setResultCd(ResultCodeConst.FAIL.getCode());
            res.setResultMsg(e.getMessage());
        }

        return res;
    }
}
