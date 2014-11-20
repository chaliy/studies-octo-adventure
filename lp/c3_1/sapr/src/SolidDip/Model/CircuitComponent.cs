namespace SolidDip.Model
{
    using System;
    using System.ComponentModel;

    [DisplayName("Компонент")]
    public class CircuitComponent : IDataErrorInfo
    {
        [Category("Інформація")]
        [DisplayName("Назва компоненти")]
        [Description("Назва компоненти в сборці")]
        public string PartName { get; set; }

        [Category("Компонент")]
        [DisplayName("Документ")]
        [Editor(typeof(CircuitComponentDataControl), typeof(CircuitComponentDataControl))]
        public byte[] Data { get; set; }

        //[Category("Початкова позиція")]
        //[DisplayName("X (мм)")]
        //public double ZeroXMm { get; set; }

        //[Category("Початкова позиція")]
        //[DisplayName("Y (мм)")]
        //public double ZeroYMm { get; set; }

        //[Category("Початкова позиція")]
        //[DisplayName("Z (мм)")]
        //public double ZeroZMm { get; set; }

        //[Category("Початкова позиція")]
        //[DisplayName("Кут")]
        //public double ZeroAngle { get; set; }

        string IDataErrorInfo.Error
        {
            get
            {
                return null;
            }
        }

        string IDataErrorInfo.this[string columnName]
        {
            get
            {
                if (columnName == "Data")
                {
                    if (Data == null || Data.Length == 0)
                    {
                        return "Документ має бути заданим";
                    }
                }

                if (columnName == "PartName")
                {
                    if (String.IsNullOrWhiteSpace(PartName))
                    {
                        return "Введіть будь ласка назву компоненту";
                    }
                }
                return null;
            }
        }
    }

}
