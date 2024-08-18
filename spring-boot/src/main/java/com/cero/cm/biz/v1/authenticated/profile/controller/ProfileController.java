package com.cero.cm.biz.v1.authenticated.profile.controller;

import com.cero.cm.biz.v1.authenticated.profile.model.req.SetProfileReq;
import com.cero.cm.biz.v1.authenticated.profile.service.ProfileService;
import com.cero.cm.common.api.model.Response;
import com.cero.cm.common.type.ResultCodeConst;
import com.cero.cm.db.entity.User;
import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;

import static com.cero.cm.util.MessageUtils.messageSourceAccessor;

@RestController
@RequestMapping(path = "/profile")
@CrossOrigin("*")
@RequiredArgsConstructor
@Api(tags = {"프로필"})
public class ProfileController {

    private final ProfileService ProfileService;
    @Operation(
            summary = "프로필 설정",
            description = "프로필 설정"
    )
    @PostMapping(path = "/set")
    public Response<User> setProfile(
            @RequestParam(value = "birth", required = false) String birth,
            @RequestParam(value = "gender", required = false) String gender,
            @RequestPart(value = "profileImg", required = false) MultipartFile profileImg,
            @RequestParam(value = "leaveDt", required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
            @Parameter(description = "Start date in the format yyyy-MM-ddTHH:mm:ss", example = "2023-07-01T00:00:00")
            @Schema(type = "string", format = "date-time") LocalDateTime leaveDt
    ) {
        Response<User> res = new Response<>();
        try {
            SetProfileReq req = new SetProfileReq();
            req.setBirth(birth);
            req.setGender(gender);
            req.setProfileImg(profileImg);
            req.setLeaveDt(leaveDt);

            res.setResult(ProfileService.setProfile(req));
            res.setResultCd(ResultCodeConst.SUCCESS.getCode());
            res.setResultMsg(messageSourceAccessor.getMessage(res.getResultCd()));
        } catch (Exception e){
            res.setResultCd(ResultCodeConst.FAIL.getCode());
            res.setResultMsg(e.getMessage());
        }
        return res;
    }

    @Operation(
            summary = "프로필 조회",
            description = "프로필 조회"
    )
    @GetMapping(path = "/get")
    public Response<User> getProfile() {
        Response<User> res = new Response<>();
        try {
            res.setResult(ProfileService.getProfile());
            res.setResultCd(ResultCodeConst.SUCCESS.getCode());
            res.setResultMsg(messageSourceAccessor.getMessage(res.getResultCd()));
        } catch (Exception e){
            res.setResultCd(ResultCodeConst.FAIL.getCode());
            res.setResultMsg(e.getMessage());
        }
        return res;
    }
}
