package com.hehaoyisheng.bcgame.dao;

import com.hehaoyisheng.bcgame.entity.BcLotteryOrder;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

public interface BcLotteryOrderDAO {

    @Insert("insert into bcLotteryOrder (account, accountId, buyMoney, buyZhuShu, haoMa, lotCode, lotName, lotType, multiple, playCode, playName, qiHao, minBonusOdds, shangji, orderId, traceId, createTime, zhuiHao, odds, bounsType, gaofan, parentList) values (#{account}, #{accountId}, #{buyMoney}, #{buyZhuShu}, #{haoMa}, #{lotCode}, #{lotName}, #{lotType}, #{multiple}, #{playCode}, #{playName}, #{qiHao}, #{minBonusOdds}, #{shangji}, #{orderId}, #{traceId}, now(), #{zhuiHao}, #{odds}, #{bounsType}, #{gaofan}, #{parentList})")
    int insert(BcLotteryOrder bcLotteryOrder);

    @Update("<script> " +
            "update bcLotteryOrder " +
            "<trim prefix=\"set\" suffixOverrides=\",\"> " +
            "<if test=\"status != null\" >status=#{status},</if>" +
            "<if test=\"lotteryHaoMa != null\" >lotteryHaoMa=#{lotteryHaoMa},</if>" +
            "<if test=\"rollBackMoney != null\" >rollBackMoney=#{rollBackMoney},</if>" +
            "<if test=\"winMoney != null\" >winMoney=#{winMoney},</if>" +
            "<if test=\"winZhuShu != null\" >winZhuShu=#{winZhuShu},</if>" +
            "</trim>" +
            " where id=#{id} " +
            " </script> ")
    int update(BcLotteryOrder bcLotteryOrder);

    @Select("<script> " +
            "select * from bcLotteryOrder " +
            " <trim prefix=\"where\" prefixOverrides=\"AND |OR \">" +
            " <if test=\"bcLotteryOrder.id != null\"> AND id=#{bcLotteryOrder.id}</if> " +
            " <if test=\"bcLotteryOrder.status != null\"> AND status=#{bcLotteryOrder.status}</if> " +
            " <if test=\"bcLotteryOrder.account != null\"> AND account=#{bcLotteryOrder.account}</if> " +
            " <if test=\"bcLotteryOrder.lotCode != null\"> AND lotCode=#{bcLotteryOrder.lotCode}</if> " +
            " <if test=\"bcLotteryOrder.qiHao != null\"> AND qiHao=#{bcLotteryOrder.qiHao}</if> " +
            " <if test=\"bcLotteryOrder.orderId != null\"> AND orderId=#{bcLotteryOrder.orderId}</if> " +
            " <if test=\"bcLotteryOrder.parentList != null\"> AND parentList like #{bcLotteryOrder.parentList}</if> " +
            " <if test=\"startTime != null\"><![CDATA[  AND createTime >=  DATE_FORMAT(#{startTime}, '%Y-%m-%d %H:%T:%s') AND createTime <= DATE_FORMAT(#{endTime}, '%Y-%m-%d %H:%T:%s')]]></if>" +
            " </trim> " +
            " order by id desc" +
            " <if test=\"from != null\"> limit #{from},#{limit} </if> " +
            " </script> ")
    List<BcLotteryOrder> select(@Param("bcLotteryOrder") BcLotteryOrder bcLotteryOrder, @Param("from") Integer from, @Param("limit") Integer limit, @Param("startTime") Date startTime, @Param("endTime") Date endTime);

    @Select("<script> " +
            "select count(*) from bcLotteryOrder " +
            " <trim prefix=\"where\" prefixOverrides=\"AND |OR \">" +
            " <if test=\"bcLotteryOrder.id != null\"> AND id=#{bcLotteryOrder.id}</if> " +
            " <if test=\"bcLotteryOrder.status != null\"> AND status=#{bcLotteryOrder.status}</if> " +
            " <if test=\"bcLotteryOrder.account != null\"> AND account=#{bcLotteryOrder.account}</if> " +
            " <if test=\"bcLotteryOrder.lotCode != null\"> AND lotCode=#{bcLotteryOrder.lotCode}</if> " +
            " <if test=\"bcLotteryOrder.qiHao != null\"> AND qiHao=#{bcLotteryOrder.qiHao}</if> " +
            " <if test=\"bcLotteryOrder.orderId != null\"> AND qiHao=#{bcLotteryOrder.orderId}</if> " +
            " <if test=\"bcLotteryOrder.parentList != null\"> AND parentList like #{bcLotteryOrder.parentList}</if> " +
            " <if test=\"startTime != null\"><![CDATA[  AND createTime >=  DATE_FORMAT(#{startTime}, '%Y-%m-%d %H:%T:%s') AND createTime <= DATE_FORMAT(#{endTime}, '%Y-%m-%d %H:%T:%s')]]></if>" +
            " </trim> " +
            " </script> ")
    int count(@Param("bcLotteryOrder") BcLotteryOrder bcLotteryOrder, @Param("startTime") Date startTime, @Param("endTime") Date endTime);

    @Select("<script> " +
            "select sum(buyMoney) from bcLotteryOrder " +
            " <trim prefix=\"where\" prefixOverrides=\"AND |OR \">" +
            " <if test=\"bcLotteryOrder.id != null\"> AND id=#{bcLotteryOrder.id}</if> " +
            " <if test=\"bcLotteryOrder.status != null\"> AND (status=1 OR status=2)</if> " +
            " <if test=\"bcLotteryOrder.account != null\"> AND account=#{bcLotteryOrder.account}</if> " +
            " <if test=\"bcLotteryOrder.lotCode != null\"> AND lotCode=#{bcLotteryOrder.lotCode}</if> " +
            " <if test=\"bcLotteryOrder.qiHao != null\"> AND qiHao=#{bcLotteryOrder.qiHao}</if> " +
            " <if test=\"bcLotteryOrder.orderId != null\"> AND qiHao=#{bcLotteryOrder.orderId}</if> " +
            " <if test=\"bcLotteryOrder.parentList != null\"> AND parentList like #{bcLotteryOrder.parentList}</if> " +
            " <if test=\"startTime != null\"><![CDATA[  AND createTime >=  DATE_FORMAT(#{startTime}, '%Y-%m-%d %H:%T:%s') AND createTime <= DATE_FORMAT(#{endTime}, '%Y-%m-%d %H:%T:%s')]]></if>" +
            " </trim> " +
            " </script> ")
    double sumBuyMoney(@Param("bcLotteryOrder") BcLotteryOrder bcLotteryOrder, @Param("startTime") Date startTime, @Param("endTime") Date endTime);

    @Select("<script> " +
            "select sum(winMoney) from bcLotteryOrder " +
            " <trim prefix=\"where\" prefixOverrides=\"AND |OR \">" +
            " <if test=\"bcLotteryOrder.id != null\"> AND id=#{bcLotteryOrder.id}</if> " +
            " <if test=\"bcLotteryOrder.status != null\"> AND (status=1 OR status=2)</if> " +
            " <if test=\"bcLotteryOrder.account != null\"> AND account=#{bcLotteryOrder.account}</if> " +
            " <if test=\"bcLotteryOrder.lotCode != null\"> AND lotCode=#{bcLotteryOrder.lotCode}</if> " +
            " <if test=\"bcLotteryOrder.qiHao != null\"> AND qiHao=#{bcLotteryOrder.qiHao}</if> " +
            " <if test=\"bcLotteryOrder.orderId != null\"> AND qiHao=#{bcLotteryOrder.orderId}</if> " +
            " <if test=\"bcLotteryOrder.parentList != null\"> AND parentList like #{bcLotteryOrder.parentList}</if> " +
            " <if test=\"startTime != null\"><![CDATA[  AND createTime >=  DATE_FORMAT(#{startTime}, '%Y-%m-%d %H:%T:%s') AND createTime <= DATE_FORMAT(#{endTime}, '%Y-%m-%d %H:%T:%s')]]></if>" +
            " </trim> " +
            " </script> ")
    double sumWinMoney(@Param("bcLotteryOrder") BcLotteryOrder bcLotteryOrder, @Param("startTime") Date startTime, @Param("endTime") Date endTime);
}
