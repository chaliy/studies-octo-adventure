namespace Tests.Services
{
    using System.IO;
    using System.Linq;
    using FluentAssertions;
    using NUnit.Framework;
    using SolidDip.Infrastructure;
    using SolidDip.Model;
    using SolidDip.Services;

    public class CorpusesStorageTests
    {
        [Test]
        public void Should_save_query_components()
        {
            Db.Reset();
            CorpusesStorage.Save(new[]
            {
                new DipCorpus
                {
                    Name = "DIP8",
                    PinCount = 8,
                    CorpusWidthMm = 6.0
                },
                new DipCorpus
                {
                    Name = "DIP24",
                    PinCount = 24,
                    CorpusWidthMm = 10.0
                }
            });

            var corpuses = CorpusesStorage.AllCorpuses();

            corpuses.Should().HaveCount(2);
            var dip8 = corpuses.First(x => x.Name == "DIP8");
            dip8.PinCount.Should().Be(8);
            dip8.CorpusWidthMm.Should().Be(6.0);
        }
    }
}
