using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace VerificationPlatform.Common
{
    public class Converter
    {
        private static String keys = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";//编码,
        private static int exponent = keys.Length;//幂数

        /// <summary>
        /// 数字转36进制
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        public static string ParseHex(long value)//
        {
            string result = string.Empty;
            do
            {
                long index = value % exponent;
                result = keys[(int)index] + result;
                value = (value - index) / exponent;
            }
            while (value > 0);

            return result;
        }

        /// <summary>
        /// 36进制转数字
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        public static long ParseInt(string value)
        {
            long result = 0;
            for (int i = 0; i < value.Length; i++)
            {
                int x = value.Length - i - 1;
                result += keys.IndexOf(value[i]) * Pow(exponent, x);
            }
            return result;
        }

        /// <summary>
        /// 一个数据的N次方
        /// </summary>
        /// <param name="x"></param>
        /// <returns></returns>
        private static long Pow(long baseNo, decimal x)
        {
            long value = 1;
            while (x > 0)
            {
                value = value * baseNo;
                x--;
            }
            return value;
        }
    }
}